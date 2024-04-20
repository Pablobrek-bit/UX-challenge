import { Room } from '@prisma/client';
import { RoomRepository } from '../../repository/interfaces/room-repository';

interface IndexRoomServiceResponse {
  rooms: Room[];
}

export class IndexRoomService {
  constructor(private roomRepository: RoomRepository) {}

  async execute(): Promise<IndexRoomServiceResponse> {
    const rooms = await this.roomRepository.index();

    return { rooms };
  }
}
