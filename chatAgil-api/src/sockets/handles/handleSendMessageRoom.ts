import { Server } from 'socket.io';
import { MessageRepositoryPrisma } from '../../repository/prisma/message-repository-prisma';
import { CreateRoomMessageService } from '../../services/messages/create-room-message-service';
import { SocketInterface } from '../setupSockets';

export default function handleSendMessageRoom(
  socket: SocketInterface,
  io: Server,
) {
  socket.on('send_message_room', async (data) => {
    let { message, roomId, userId } = data;

    roomId = Number(roomId);

    const createRoomMessageService = new CreateRoomMessageService(
      new MessageRepositoryPrisma(),
    );

    const { message: newMessage } = await createRoomMessageService.execute({
      message,
      roomId,
      userId,
    });

    io.emit('new_message_room', newMessage);
  });
}
