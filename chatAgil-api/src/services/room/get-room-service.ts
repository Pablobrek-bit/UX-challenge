import { Room } from '@prisma/client';
import { RoomRepository } from '../../repository/interfaces/room-repository';

interface GetRoomServiceRequest {
  id: number;
}

interface GetRoomServiceResponse {
  room: Room;
}

export class GetRoomService {
  constructor(private roomRepository: RoomRepository) {}

  async execute({
    id,
  }: GetRoomServiceRequest): Promise<GetRoomServiceResponse> {
    const room = await this.roomRepository.findById(id);

    if (!room) {
      throw new Error('Room not found');
    }

    return { room };
  }
}
