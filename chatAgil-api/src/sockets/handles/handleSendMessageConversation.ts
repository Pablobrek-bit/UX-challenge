import { MessageRepositoryPrisma } from '../../repository/prisma/message-repository-prisma';
import { ConversationRepositoryPrisma } from '../../repository/prisma/conversation-repository-prisma';
import { CreateConversationMessageService } from '../../services/messages/create-conversation-message-service';
import { SocketInterface } from '../setupSockets';
import { Server } from 'socket.io';

export default function handleSendMessageConversation(
  socket: SocketInterface,
  io: Server,
) {
  socket.on('send_message_conversation', async (data) => {
    let { message, friendId, userId } = data;

    const messageRepository = new MessageRepositoryPrisma();
    const conversationRepository = new ConversationRepositoryPrisma();
    const conversation = await conversationRepository.get(friendId, userId);

    const createConversationService = new CreateConversationMessageService(
      messageRepository,
    );

    const { message: newMessage } = await createConversationService.execute({
      conversationId: conversation?.id ?? 0,
      message,
      userId,
    });

    io.emit('new_message_conversation', newMessage);
  });
}
