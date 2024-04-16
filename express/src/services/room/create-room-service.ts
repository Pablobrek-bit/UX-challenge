import { Room } from '@prisma/client';
import { RoomRepository } from '../../repository/interfaces/room-repository';
import { hash } from 'bcryptjs';

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

    const room = await this.roomRepository.create({
      name,
      password: hashedPassword,
      userId,
    });

    return { room };
  }
}
