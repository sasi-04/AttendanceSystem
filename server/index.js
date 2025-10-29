import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import QRCode from 'qrcode'
import http from 'http'
import { Server as SocketIOServer } from 'socket.io'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const server = http.createServer(app)
const io = new SocketIOServer(server, { cors: { origin: '*' } })

app.use(cors())
app.use(express.json())

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'

// In-memory stores for demo
const sessions = new Map() // sessionId -> { courseId, startTime, endTime, status, windowSeconds, present:Set<string>, enrolled:Set<string>, currentTokenJti, tokenExpiresAt }
const tokens = new Map() // jti -> { sessionId, expiresAt, active, code? }
const shortCodes = new Map() // code -> jti

// Demo users and enrollments
const demoEnrollments = new Map() // courseId -> Set(studentId)
demoEnrollments.set('COURSE1', new Set(['student1', 'student2']))

function generateToken(sessionId) {
  const jti = `${sessionId}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 30
  const token = jwt.sign({ jti, sid: sessionId, iat, exp, ver: 1 }, JWT_SECRET, { algorithm: 'HS256' })
  // create 6-char short code [A-Z0-9]
  let code
  do {
    code = Math.random().toString(36).slice(2, 8).toUpperCase()
  } while (shortCodes.has(code))
  tokens.set(jti, { sessionId, expiresAt: exp * 1000, active: true, code })
  shortCodes.set(code, jti)
  return { token, jti, exp }
}

function scheduleExpiry(jti) {
  const t = tokens.get(jti)
  if (!t) return
  const delay = Math.max(0, t.expiresAt - Date.now())
  setTimeout(() => {
    const tok = tokens.get(jti)
    if (tok) tok.active = false
    if (tok?.code) shortCodes.delete(tok.code)
    const sess = sessions.get(t.sessionId)
    if (sess && sess.currentTokenJti === jti) {
      // window expired; keep session active to allow new generations
      io.to(`session:${t.sessionId}`).emit('session_closed', {
        sessionId: t.sessionId,
        summary: {
          present: sess.present.size,
          total: sess.enrolled.size,
          absent: Math.max(0, sess.enrolled.size - sess.present.size)
        }
      })
      // clear the current QR marker so clients know it's gone
      sess.currentTokenJti = null
      sess.tokenExpiresAt = null
    }
  }, delay)
}

// Socket.IO
io.on('connection', (socket) => {
  socket.on('subscribe', ({ sessionId }) => {
    socket.join(`session:${sessionId}`)
    const sess = sessions.get(sessionId)
    if (sess && sess.currentTokenJti) {
      const expMs = sess.tokenExpiresAt
      const secondsRemaining = Math.max(0, Math.ceil((expMs - Date.now()) / 1000))
      socket.emit('countdown', { secondsRemaining })
    }
  })
  socket.on('unsubscribe', ({ sessionId }) => {
    socket.leave(`session:${sessionId}`)
  })
})

// Routes

// Create session (teacher/admin)
app.post('/sessions', (req, res) => {
  const { courseId, windowSeconds = 30 } = req.body || {}
  if (!courseId) return res.status(400).json({ error: 'courseId_required' })
  const sessionId = `S_${Date.now()}`
  const enrolled = demoEnrollments.get(courseId) || new Set()
  const session = {
    courseId,
    startTime: Date.now(),
    endTime: null,
    status: 'active',
    windowSeconds,
    present: new Set(),
    enrolled: new Set(enrolled),
    currentTokenJti: null,
    tokenExpiresAt: null
  }
  sessions.set(sessionId, session)

  const { token, jti, exp } = generateToken(sessionId)
  session.currentTokenJti = jti
  session.tokenExpiresAt = exp * 1000
  scheduleExpiry(jti)

  QRCode.toDataURL(token).then((imageDataUrl) => {
    const code = tokens.get(jti)?.code
    io.to(`session:${sessionId}`).emit('qr_updated', { imageDataUrl, token, code, expiresAt: new Date(exp * 1000).toISOString(), jti })
  }).catch(() => {})

  return res.json({ sessionId, status: session.status, startTime: session.startTime, windowSeconds })
})

// Current QR fetch (optional)
app.get('/sessions/:sessionId/qr', (req, res) => {
  const { sessionId } = req.params
  const sess = sessions.get(sessionId)
  if (!sess) return res.status(404).json({ error: 'not_found' })
  const jti = sess.currentTokenJti
  if (!jti) return res.status(404).json({ error: 'no_token' })
  const exp = Math.floor(sess.tokenExpiresAt / 1000)
  const token = jwt.sign({ jti, sid: sessionId, iat: Math.floor(Date.now()/1000), exp, ver: 1 }, JWT_SECRET)
  const code = tokens.get(jti)?.code
  QRCode.toDataURL(token).then((imageDataUrl) => {
    res.json({ imageDataUrl, token, code, expiresAt: new Date(exp * 1000).toISOString(), jti })
  }).catch(() => res.status(500).json({ error: 'qr_error' }))
})

// Student scan
app.post('/attendance/scan', (req, res) => {
  const { token, studentId = 'student1' } = req.body || {}
  if (!token) return res.status(400).json({ error: 'token_required' })
  try {
    const cleaned = String(token).trim().toUpperCase()
    let jti
    let sessionId
    if (cleaned.includes('.')) {
      const payload = jwt.verify(cleaned, JWT_SECRET)
      jti = payload.jti
      sessionId = payload.sid
    } else {
      const mapped = shortCodes.get(cleaned)
      if (!mapped) return res.status(400).json({ error: 'invalid_code' })
      jti = mapped
      const tokRec = tokens.get(jti)
      sessionId = tokRec?.sessionId
    }
    const tok = tokens.get(jti)
    if (!tok || tok.sessionId !== sessionId) return res.status(400).json({ error: 'invalid_code' })
    if (!tok.active) return res.status(409).json({ error: 'already_used' })
    const sess = sessions.get(sessionId)
    if (!sess) return res.status(410).json({ error: 'session_closed' })
    if (Date.now() >= tok.expiresAt) return res.status(410).json({ error: 'expired_code' })
    if (!sess.enrolled.has(studentId)) return res.status(403).json({ error: 'not_enrolled' })

    sess.present.add(studentId)
    tok.active = false
    if (tok.code) shortCodes.delete(tok.code)

    io.to(`session:${sessionId}`).emit('scan_confirmed', {
      sessionId,
      countPresent: sess.present.size,
      countRemaining: Math.max(0, sess.enrolled.size - sess.present.size)
    })

    return res.json({ status: 'present', sessionId, markedAt: new Date().toISOString() })
  } catch (e) {
    console.error('Scan validate error:', e)
    if (e.name === 'TokenExpiredError') return res.status(410).json({ error: 'expired_code' })
    return res.status(400).json({ error: 'invalid_code', message: e?.message })
  }
})

// Generate QR on-demand (new token per click). If sessionId missing or invalid, start new session
app.post('/qr/generate', async (req, res) => {
  try {
    const { sessionId: providedSessionId, courseId = 'COURSE1' } = req.body || {}
    if (!courseId) return res.status(400).json({ error: 'course_required', message: 'courseId is required' })
    let sessionId = providedSessionId
    let sess = sessionId && sessions.get(sessionId)
    if (!sess) {
      // create new session
      sessionId = `S_${Date.now()}`
      const enrolled = demoEnrollments.get(courseId) || new Set()
      sess = {
        courseId,
        startTime: Date.now(),
        endTime: null,
        status: 'active',
        windowSeconds: 30,
        present: new Set(),
        enrolled: new Set(enrolled),
        currentTokenJti: null,
        tokenExpiresAt: null
      }
      sessions.set(sessionId, sess)
    }

    // Deactivate any previously active token for this session
    if (sess.currentTokenJti && tokens.has(sess.currentTokenJti)) {
      const prev = tokens.get(sess.currentTokenJti)
      prev.active = false
      if (prev.code) shortCodes.delete(prev.code)
    }
    const { token, jti, exp } = generateToken(sessionId)
    sess.currentTokenJti = jti
    sess.tokenExpiresAt = exp * 1000
    scheduleExpiry(jti)

    try {
      const imageDataUrl = await QRCode.toDataURL(token)
      const code = tokens.get(jti)?.code
      io.to(`session:${sessionId}`).emit('qr_updated', { imageDataUrl, token, code, expiresAt: new Date(exp * 1000).toISOString(), jti })
      io.to(`session:${sessionId}`).emit('countdown', { secondsRemaining: 30 })
      return res.json({ sessionId, imageDataUrl, token, code, expiresAt: new Date(exp * 1000).toISOString(), jti })
    } catch (imgErr) {
      console.error('QR image generation failed, falling back to token-only:', imgErr)
      // Emit token so clients can render QR locally
      const code = tokens.get(jti)?.code
      io.to(`session:${sessionId}`).emit('qr_updated', { imageDataUrl: null, token, code, expiresAt: new Date(exp * 1000).toISOString(), jti })
      io.to(`session:${sessionId}`).emit('countdown', { secondsRemaining: 30 })
      return res.json({ sessionId, imageDataUrl: null, token, code, expiresAt: new Date(exp * 1000).toISOString(), jti, clientRender: true })
    }
  } catch (e) {
    console.error('QR generate error:', e)
    return res.status(500).json({ error: 'qr_error', message: e?.message || 'QR generation failed' })
  }
})

// Close session explicitly (teacher/admin)
app.post('/sessions/:sessionId/close', (req, res) => {
  const { sessionId } = req.params
  const sess = sessions.get(sessionId)
  if (!sess) return res.status(404).json({ error: 'not_found' })
  if (sess.status === 'closed' || sess.status === 'expired') {
    return res.json({ sessionId, status: sess.status, endTime: sess.endTime })
  }
  sess.status = 'closed'
  sess.endTime = Date.now()
  // deactivate current token
  if (sess.currentTokenJti && tokens.has(sess.currentTokenJti)) {
    tokens.get(sess.currentTokenJti).active = false
  }
  io.to(`session:${sessionId}`).emit('session_closed', {
    sessionId,
    summary: {
      present: sess.present.size,
      total: sess.enrolled.size,
      absent: Math.max(0, sess.enrolled.size - sess.present.size)
    }
  })
  return res.json({ sessionId, status: sess.status, endTime: sess.endTime })
})

// Serve frontend build (same-origin) if available
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.resolve(__dirname, '../dist')
app.use(express.static(distPath))
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

const PORT = process.env.PORT || 5174
const HOST = process.env.HOST || '0.0.0.0'
server.listen(PORT, HOST, () => console.log(`Attendance server (API + SPA) on http://${HOST}:${PORT}`))


