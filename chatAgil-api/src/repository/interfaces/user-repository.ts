import { Prisma, User, UserStatus } from '@prisma/client';

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  index(): Promise<{ id: string; name: string; status: string }[]>;
  findById(id: string): Promise<User | null>;
  updateStatus(id: string, status: 'online' | 'offline'): Promise<void>;
  getOn(): Promise<{ id: string; name: string; status: UserStatus }[]>;
}
