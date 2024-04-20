import { Room } from '@prisma/client';

export interface RoomRepository {
  index(): Promise<Room[]>;
  create(data: {
    name: string;
    password?: string;
    userId: string;
  }): Promise<Room>;

  delete(id: number): Promise<void | Room>;

  joinRoom(id: number, userId: string): Promise<void>;

  findById(id: number): Promise<Room | null>;

  userInRoom(userId: string, roomId: number): Promise<boolean>;
}
