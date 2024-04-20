import { Message } from '@prisma/client';
import { MessageRepository } from '../../repository/interfaces/message-repository';

interface GetConversationMessageServiceRequest {
  conversationId: number;
}

interface GetConversationMessageServiceResponse {
  messages: Message[];
}

export class GetConversationMessageService {
  constructor(private messageRepository: MessageRepository) {}

  async execute({
    conversationId,
  }: GetConversationMessageServiceRequest): Promise<GetConversationMessageServiceResponse> {
    const messages = await this.messageRepository.listByConversation(
      conversationId,
    );

    return { messages };
  }
}
