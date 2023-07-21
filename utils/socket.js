import { io } from 'socket.io-client';
const socket = io.connect('https://youth-connect-server.onrender.com/');
export default socket;
