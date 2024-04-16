import { Message, Prisma } from '@prisma/client';

export interface MessagesRepository {
  create(data: Prisma.MessageCreateInput): Promise<Message>;
}
