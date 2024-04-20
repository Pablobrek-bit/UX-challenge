import { prisma } from '../../lib/prisma';
import { RoomRepository } from '../interfaces/room-repository';

export class RoomRepositoryPrisma implements RoomRepository {
  async index() {
    const rooms = await prisma.room.findMany({
      include: {
        users: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
        Message: {
          select: {
            id: true,
            text: true,
            userId: true,
          },
        },
      },
    });

    return rooms;
  }

  async create(data: { name: string; password?: string; userId: string }) {
    const room = await prisma.room.create({
      data: {
        name: data.name,
        password: data.password,
        users: {
          connect: {
            id: data.userId,
          },
        },
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
        users: {
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

      include: {
        users: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
        Message: {
          select: {
            id: true,
            text: true,
            createdAt: true,
            user: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });

    return room;
  }

  async userInRoom(userId: string, roomId: number) {
    const userInRoom = await prisma.room.findFirst({
      where: {
        id: roomId,
        users: {
          some: {
            id: userId,
          },
        },
      },
    });

    return !!userInRoom;
  }
}
