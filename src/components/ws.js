import { io } from 'socket.io-client'

let socket
export function getSocket() {
  if (!socket) {
    // Connect to same-origin Socket.IO server
    socket = io({ transports: ['websocket', 'polling'], autoConnect: true })
  }
  return socket
}




