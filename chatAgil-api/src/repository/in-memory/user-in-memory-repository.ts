import { $Enums, Prisma, User, UserStatus } from '@prisma/client';
import { UserRepository } from '../interfaces/user-repository';
import { randomUUID } from 'crypto';

export class UserInMemoryRepository implements UserRepository {
  getOn(): Promise<{ id: string; name: string; status: $Enums.UserStatus }[]> {
    throw new Error('Method not implemented.');
  }
  public users: User[] = [];
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      hashedPassword: data.hashedPassword,
      status: UserStatus.OFFLINE,
      createdAt: new Date(),
    };
    this.users.push(user);

    return user;
  }
  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }

  async index() {
    return this.users;
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) return null;

    return user;
  }

  async updateStatus(id: string): Promise<void> {
    const user = this.users.find((user) => user.id === id);

    if (!user) return;

    if (user.status === UserStatus.ONLINE) {
      user.status = UserStatus.OFFLINE;
    } else {
      user.status = UserStatus.ONLINE;
    }
  }
}
