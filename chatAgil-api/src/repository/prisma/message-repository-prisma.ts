import { Message, Prisma } from '@prisma/client';
import { MessageRepository } from '../interfaces/message-repository';
import { prisma } from '../../lib/prisma';

export class MessageRepositoryPrisma implements MessageRepository {
  async createRoom(text: string, userId: string, roomId: number) {
    const message = await prisma.message.create({
      data: {
        text: text,
        user: {
          connect: {
            id: userId,
          },
        },
        room: {
          connect: {
            id: roomId,
          },
        },
      },
    });

    return message;
  }

  async listByRoom(roomId: number) {
    const messages = await prisma.message.findMany({
      where: {
        roomId: roomId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return messages;
  }

  async createConversation(
    text: string,
    userId: string,
    conversationId: number,
  ) {
    const message = await prisma.message.create({
      data: {
        text: text,
        user: {
          connect: {
            id: userId,
          },
        },
        conversation: {
          connect: {
            id: conversationId,
          },
        },
      },
    });

    return message;
  }

  async listByConversation(conversationId: number) {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
      },
    });

    return messages;
  }
}
