import { Prisma, UserStatus } from '@prisma/client';
import { UserRepository } from '../interfaces/user-repository';
import { prisma } from '../../lib/prisma';

export class UserRepositoryPrisma implements UserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async index() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        status: true,
      },
    });

    return users;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async updateStatus(id: string, status: 'online' | 'offline'): Promise<void> {
    const user = await this.findById(id);

    if (!user) {
      return;
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        status: status === 'online' ? UserStatus.ONLINE : UserStatus.OFFLINE,
      },
    });
  }

  async getOn(): Promise<{ id: string; name: string; status: UserStatus }[]> {
    const users = await prisma.user.findMany({
      where: {
        status: UserStatus.ONLINE,
      },
      select: {
        id: true,
        name: true,
        status: true,
      },
    });

    return users;
  }
}
