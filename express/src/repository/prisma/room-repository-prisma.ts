import { prisma } from '../../lib/prisma';
import { RoomRepository } from '../interfaces/room-repository';

export class RoomRepositoryPrisma implements RoomRepository {
  async index() {
    const rooms = await prisma.room.findMany({
      include: {
        user: true,
      },
    });

    return rooms;
  }

  async create(data: { name: string; password?: string; userId: string }) {
    const room = await prisma.room.create({
      data: {
        name: data.name,
        password: data.password,
        userId: data.userId,
      },
    });

    return room;
  }

  async delete(id: number) {
    const room = await prisma.room.delete({
      where: {
        id,
      },
    });

    return room;
  }

  async joinRoom(id: number, userId: string) {
    await prisma.room.update({
      where: {
        id,
      },
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async findById(id: number) {
    const room = await prisma.room.findUnique({
      where: {
        id,
      },
    });

    return room;
  }
}
