import { UserStatus } from '@prisma/client';
import { ConversationRepository } from '../../repository/interfaces/conversation-repository';
import { ConversationNotExistsError } from '../errors/conversation/conversation-not-exist-error';

interface GetConversationServiceRequest {
  id: string;
  idUser: string;
}

interface GetConversationServiceResponse {
  conversation: {
    id: number;
    createdAt: Date;
    participants: { id: string; name: string; status: UserStatus }[];
    messages: {
      text: string;
      createdAt: Date;
      user: { id: string; name: string };
    }[];
  };
}

export class GetConversationService {
  constructor(private conversationRepository: ConversationRepository) {}

  async execute({
    id,
    idUser,
  }: GetConversationServiceRequest): Promise<GetConversationServiceResponse> {
    const conversation = await this.conversationRepository.get(id, idUser);

    if (!conversation) {
      throw new ConversationNotExistsError();
    }

    return { conversation };
  }
}
