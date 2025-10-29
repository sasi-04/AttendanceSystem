export const API_BASE = import.meta.env.VITE_API_BASE || '/api'

export async function apiPost(path, body) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body || {})
    })
    const text = await res.text()
    let data = {}
    try { data = text ? JSON.parse(text) : {} } catch { data = { raw: text } }
    if (!res.ok) throw Object.assign(new Error(data.message || data.error || 'request_failed'), { code: data.error, status: res.status, raw: data.raw })
    return data
  } catch (err) {
    if (err.name === 'TypeError') {
      // Network or CORS error
      throw Object.assign(new Error('network_error'), { code: 'network_error' })
    }
    throw err
  }
}

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`)
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw Object.assign(new Error(data.error || 'request_failed'), { code: data.error })
  return data
}


