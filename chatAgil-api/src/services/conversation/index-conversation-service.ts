import { Conversation } from '@prisma/client';
import { ConversationRepository } from '../../repository/interfaces/conversation-repository';

interface IndexConversationServiceRequest {
  userId: string;
}

interface IndexConversationServiceResponse {
  conversations: Conversation[];
}

export class IndexConversationService {
  constructor(private conversationRepository: ConversationRepository) {}

  async execute({
    userId,
  }: IndexConversationServiceRequest): Promise<IndexConversationServiceResponse> {
    const conversations = await this.conversationRepository.index(userId);

    return { conversations };
  }
}
