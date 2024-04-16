import { compare } from 'bcryptjs';
import { RoomRepository } from '../../repository/interfaces/room-repository';

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
    // verificando se a sala existe e se existe a senha está correta
    const existsRoom = await this.roomRepository.findById(id);

    if (!existsRoom) {
      throw new Error('Room not found');
    }

    if (password && existsRoom.password) {
      const passwordMatch = await compare(password, existsRoom.password);

      if (!passwordMatch) {
        throw new Error('Incorrect password'); // To-Do: Create a new error class
      }
    }

    await this.roomRepository.joinRoom(id, userId);
  }
}
