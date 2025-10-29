import { io } from 'socket.io-client'
import { API_BASE } from './api'

let socket
export function getSocket() {
  if (!socket) {
    const url = API_BASE && /^https?:\/\//i.test(API_BASE) ? API_BASE : ''
    socket = io(url, { transports: ['websocket', 'polling'], autoConnect: true })
  }
  return socket
}




