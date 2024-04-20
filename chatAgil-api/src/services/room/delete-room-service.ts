import { Room } from '@prisma/client';
import { RoomRepository } from '../../repository/interfaces/room-repository';
import { RoomNotExistsError } from '../errors/room/room-not-exists-error';

interface DeleteRoomServiceRequest {
  id: number;
}

export class DeleteRoomService {
  constructor(private roomRepository: RoomRepository) {}

  async execute({ id }: DeleteRoomServiceRequest): Promise<void> {
    const existRoom = await this.roomRepository.findById(id);

    if (!existRoom) throw new RoomNotExistsError();

    await this.roomRepository.delete(id);
  }
}
