import { Conversation, UserStatus } from '@prisma/client';

export interface ConversationRepository {
  create(id: string, idUser: string): Promise<Conversation>;

  index(id: string): Promise<Conversation[]>;

  get(
    id: string,
    idUser: string,
  ): Promise<{
    id: number;
    createdAt: Date;
    participants: { id: string; name: string; status: UserStatus }[];
    messages: {
      id: number;
      text: string;
      createdAt: Date;
      user: { id: string; name: string };
    }[];
  } | null>;
}
