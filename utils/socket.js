import { io } from 'socket.io-client'
const socket = io.connect('https://youth-connect-backend.onrender.com/')
export default socket
