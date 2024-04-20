import { Message } from '@prisma/client';
import { MessageRepository } from '../../repository/interfaces/message-repository';
import { MessageCredentialsIncorrectError } from '../errors/message/message-credentials-incorrect-error';
import { RoomRepositoryPrisma } from '../../repository/prisma/room-repository-prisma';
import { RoomUserNotInRoomError } from '../errors/room/room-user-not-in-room-error';

interface CreateRoomMessageServiceRequest {
  userId: string;
  roomId: number;
  message: string;
}

interface CreateRoomMessageServiceResponse {
  message: Message;
}

export class CreateRoomMessageService {
  constructor(private messageRepository: MessageRepository) {}

  async execute({
    message,
    roomId,
    userId,
  }: CreateRoomMessageServiceRequest): Promise<CreateRoomMessageServiceResponse> {
    if (!message || !userId || !roomId) {
      throw new MessageCredentialsIncorrectError();
    }
    const roomRepository = new RoomRepositoryPrisma();

    const userInRoom = await roomRepository.userInRoom(userId, roomId);

    if (!userInRoom) {
      throw new RoomUserNotInRoomError();
    }

    const messageCreated = await this.messageRepository.createRoom(
      message,
      userId,
      roomId,
    );

    return {
      message: messageCreated,
    };
  }
}
