import { Message } from '@prisma/client';
import { MessageRepository } from '../../repository/interfaces/message-repository';
import { MessageCredentialsIncorrectError } from '../errors/message/message-credentials-incorrect-error';

interface CreateConversationMessageServiceRequest {
  userId: string;
  conversationId: number;
  message: string;
}

interface CreateConversationMessageServiceResponse {
  message: Message;
}

export class CreateConversationMessageService {
  constructor(private messageRepository: MessageRepository) {}

  async execute({
    conversationId,
    message,
    userId,
  }: CreateConversationMessageServiceRequest): Promise<CreateConversationMessageServiceResponse> {
    if (!message || !userId || !conversationId) {
      throw new MessageCredentialsIncorrectError();
    }

    const messageCreated = await this.messageRepository.createConversation(
      message,
      userId,
      conversationId,
    );

    return { message: messageCreated };
  }
}
