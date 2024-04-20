import { Server } from 'socket.io';
import { SocketInterface } from '../setupSockets';

export default function handleJoinRoom(socket: SocketInterface, io: Server) {
  socket.on('error', (error) => {
    console.log('Socket erro:' + error);

    socket.emit('error', 'An error occurred. Please try again later.');
  });
}
