import { compare } from 'bcryptjs';
import { RoomRepository } from '../../repository/interfaces/room-repository';
import { RoomCredentialsIncorrectError } from '../errors/room/room-credentials-incorrect-error';
import { RoomNotExistsError } from '../errors/room/room-not-exists-error';

interface JoinRoomServiceRequest {
  id: number;
  userId: string;
  password?: string;
}

export class JoinRoomService {
  constructor(private roomRepository: RoomRepository) {}

  async execute({
    id,
    userId,
    password,
  }: JoinRoomServiceRequest): Promise<void> {
    const existsRoom = await this.roomRepository.findById(id);

    if (!existsRoom) {
      throw new RoomNotExistsError();
    }

    if (password && existsRoom.password) {
      const passwordMatch = await compare(password, existsRoom.password);

      if (!passwordMatch) {
        throw new RoomCredentialsIncorrectError();
      }
    }

    await this.roomRepository.joinRoom(id, userId);
  }
}
