import { prisma } from '../../lib/prisma';
import { ConversationRepository } from '../interfaces/conversation-repository';

export class ConversationRepositoryPrisma implements ConversationRepository {
  async create(id: string, idUser: string) {
    const conversation = await prisma.conversation.create({
      data: {
        participants: {
          connect: [
            {
              id: idUser,
            },
            {
              id: id,
            },
          ],
        },
      },
    });

    return conversation;
  }

  async index(id: string) {
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            id,
          },
        },
      },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
        messages: {
          select: {
            text: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return conversations;
  }

  async get(id: string, idUser: string) {
    const conversation = await prisma.conversation.findFirst({
      where: {
        participants: {
          some: {
            id,
          },
        },
        AND: {
          participants: {
            some: {
              id: idUser,
            },
          },
        },
      },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
        messages: {
          select: {
            id: true,
            text: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return conversation;
  }
}
