import { Message } from '@prisma/client';
import { MessageRepository } from '../../repository/interfaces/message-repository';

interface GetRoomMessageServiceRequest {
  roomId: number;
}

interface GetRoomMessageServiceResponse {
  messages: Message[];
}

export class GetRoomMessageService {
  constructor(private messageRepository: MessageRepository) {}

  async execute({
    roomId,
  }: GetRoomMessageServiceRequest): Promise<GetRoomMessageServiceResponse> {
    const messages = await this.messageRepository.listByRoom(roomId);

    return {
      messages,
    };
  }
}
