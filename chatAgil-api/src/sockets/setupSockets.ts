import { Server, Socket } from 'socket.io';
import handleUserLoggedIn from './handles/handleUserLoggedIn';
import handleDisconnect from './handles/handleDisconnect';
import handleSendMessageRoom from './handles/handleSendMessageRoom';
import handleSendMessageConversation from './handles/handleSendMessageConversation';
import handleJoinRoom from './handles/handleJoinRoom';

export interface SocketInterface extends Socket {
  idUser?: string;
}

export default function setupSockets(io: Server) {
  io.on('connect', (socket: SocketInterface) => {
    handleUserLoggedIn(socket)
      .then((id) => {
        socket.idUser = id;
      })
      .catch((error) => {
        console.error('an error occurred', error);
      });

    handleDisconnect(socket);
    handleSendMessageRoom(socket, io);
    handleSendMessageConversation(socket, io);
    handleJoinRoom(socket, io);
  });
}
