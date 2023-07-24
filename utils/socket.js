import { io } from 'socket.io-client'
const socket = io.connect('https://youth-connect-backen.onrender.com/')
export default socket
