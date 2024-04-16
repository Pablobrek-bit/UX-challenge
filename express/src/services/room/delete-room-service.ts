import { Room } from '@prisma/client';
import { RoomRepository } from '../../repository/interfaces/room-repository';

interface DeleteRoomServiceRequest {
  id: number;
}

interface DeleteRoomServiceResponse {
  room: Room;
}

export class DeleteRoomService {
  constructor(private roomRepository: RoomRepository) {}

  async execute({
    id,
  }: DeleteRoomServiceRequest): Promise<DeleteRoomServiceResponse> {
    const room = await this.roomRepository.delete(id);

    if (!room) throw new Error('Room not found');

    return { room };
  }
}
