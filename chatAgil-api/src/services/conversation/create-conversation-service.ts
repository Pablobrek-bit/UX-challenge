import { Conversation } from '@prisma/client';
import { ConversationRepository } from '../../repository/interfaces/conversation-repository';
import { ConversationAlreadyExistError } from '../errors/conversation/conversation-already-exist-error';

interface CreateConversationServiceRequest {
  id: string;
  idUser: string;
}

interface CreateConversationServiceResponse {
  conversation: Conversation;
}

export class CreateConversationService {
  constructor(private conversationRepository: ConversationRepository) {}

  async execute({
    id,
    idUser,
  }: CreateConversationServiceRequest): Promise<CreateConversationServiceResponse> {
    const conversationGet = await this.conversationRepository.get(id, idUser);

    if (!conversationGet) {
      console.log('conversation not exists');
      const conversation = await this.conversationRepository.create(id, idUser);

      console.log('conversation created: ', conversation);

      return { conversation };
    } else {
      console.log('conversation exists');
      console.log('conversationGet: ', conversationGet);
      return { conversation: conversationGet };
    }
  }
}
