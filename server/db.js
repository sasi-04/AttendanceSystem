
import Datastore from 'nedb-promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
let sessionsDb, tokensDb, codesDb, presentsDb

export function initDb(){
  if (sessionsDb) return
  sessionsDb = Datastore.create({ filename: path.resolve(__dirname, 'data/sessions.db'), autoload: true })
  tokensDb   = Datastore.create({ filename: path.resolve(__dirname, 'data/tokens.db'), autoload: true })
  codesDb    = Datastore.create({ filename: path.resolve(__dirname, 'data/codes.db'), autoload: true })
  presentsDb = Datastore.create({ filename: path.resolve(__dirname, 'data/presents.db'), autoload: true })
}

export function createSession(session){
  return sessionsDb.update({ id: session.id }, { $set: session }, { upsert: true })
}

export function setCurrentToken(sessionId, jti, tokenExpiresAt){
  return sessionsDb.update({ id: sessionId }, { $set: { currentTokenJti: jti, tokenExpiresAt } })
}

export function clearCurrentToken(sessionId){
  return sessionsDb.update({ id: sessionId }, { $set: { currentTokenJti: null, tokenExpiresAt: null } })
}

export function saveToken(record){
  return tokensDb.update({ jti: record.jti }, { $set: record }, { upsert: true })
}

export function deactivateToken(jti){
  return tokensDb.update({ jti }, { $set: { active: 0 } })
}

export async function getToken(jti){
  return tokensDb.findOne({ jti })
}

export function saveShortCode(code, jti){
  return codesDb.update({ code }, { $set: { code, jti } }, { upsert: true })
}

export function deleteShortCode(code){
  return codesDb.remove({ code }, { multi: false })
}

export async function getJtiByCode(code){
  const row = await codesDb.findOne({ code })
  return row?.jti
}

export function markPresent(sessionId, studentId){
  return presentsDb.update({ sessionId, studentId }, { $set: { sessionId, studentId } }, { upsert: true })
}

export async function getPresentCount(sessionId){
  return presentsDb.count({ sessionId })
}


