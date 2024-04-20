import { Room } from '@prisma/client';
import { RoomRepository } from '../../repository/interfaces/room-repository';
import { hash } from 'bcryptjs';
import { RoomCredentialsIncorrectError } from '../errors/room/room-credentials-incorrect-error';

interface CreateRoomServiceRequest {
  name: string;
  password?: string;
  user: string;
}

interface CreateRoomServiceResponse {
  room: Room;
}

export class CreateRoomService {
  constructor(private roomRepository: RoomRepository) {}

  async execute({
    name,
    password,
    user: userId,
  }: CreateRoomServiceRequest): Promise<CreateRoomServiceResponse> {
    let hashedPassword;

    if (password) hashedPassword = await hash(password, 6);

    if (!name || !userId) {
      throw new RoomCredentialsIncorrectError();
    }

    const room = await this.roomRepository.create({
      name,
      password: hashedPassword,
      userId,
    });

    return { room };
  }
}
