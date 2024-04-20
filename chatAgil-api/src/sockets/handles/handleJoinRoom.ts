import { Server } from 'socket.io';
import { SocketInterface } from '../setupSockets';

export default function handleJoinRoom(socket: SocketInterface, io: Server) {
  socket.on('join_room', (roomId) => {
    socket.join(roomId);

    socket.broadcast.to(roomId).emit('user_joined_room', socket.id);
  });
}
