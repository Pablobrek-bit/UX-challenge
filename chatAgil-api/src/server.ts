import { app } from './app';
import { env } from './env';
import { createServer } from 'http';
import { Server as IoServer } from 'socket.io';
import { UserRepositoryPrisma } from './repository/prisma/user-repository-prisma';
import { UpdateStatusUserService } from './services/user/update-Status-user-service';
import { CreateRoomMessageService } from './services/messages/create-room-message-service';
import { MessageRepositoryPrisma } from './repository/prisma/message-repository-prisma';
import { CreateConversationMessageService } from './services/messages/create-conversation-message-service';
import { ConversationRepositoryPrisma } from './repository/prisma/conversation-repository-prisma';
import setupSockets from './sockets/setupSockets';

const httpServer = createServer(app);

export const io = new IoServer(httpServer, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

setupSockets(io);

// io.on('connect', (socket) => {
//   let idUser: string;
//   socket.on('userLoggedIn', ({ id, status }) => {
//     const userRepository = new UserRepositoryPrisma();
//     const userUpdateService = new UpdateStatusUserService(userRepository);

//     idUser = id;

//     console.log('connected', idUser);
//     userUpdateService.execute({ id, status });
//   });

//   socket.on('disconnect', () => {
//     const userRepository = new UserRepositoryPrisma();
//     const userUpdateService = new UpdateStatusUserService(userRepository);

//     if (!idUser) {
//       return;
//     }

//     console.log('disconnected', idUser);
//     userUpdateService.execute({ id: idUser, status: 'offline' });
//   });

//   socket.on('send_message_room', async (data) => {
//     let { message, roomId, userId } = data;

//     roomId = Number(roomId);

//     const createRoomMessageService = new CreateRoomMessageService(
//       new MessageRepositoryPrisma(),
//     );

//     const { message: newMessage } = await createRoomMessageService.execute({
//       message,
//       roomId,
//       userId,
//     });

//     // envia a mensagem para todos os usuários
//     io.emit('new_message_room', newMessage);
//   });

//   socket.on('send_message_conversation', async (data) => {
//     let { message, friendId, userId } = data;

//     const messageRepository = new MessageRepositoryPrisma();
//     const conversationRepository = new ConversationRepositoryPrisma();
//     const conversation = await conversationRepository.get(friendId, userId);

//     const createConversationService = new CreateConversationMessageService(
//       messageRepository,
//     );

//     const { message: newMessage } = await createConversationService.execute({
//       conversationId: conversation?.id ?? 0,
//       message,
//       userId,
//     });

//     io.emit('new_message_conversation', newMessage);
//   });
// });

httpServer.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT} 🚀`);
});
