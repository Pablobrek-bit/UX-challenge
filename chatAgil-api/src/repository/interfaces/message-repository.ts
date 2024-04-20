import { Message } from '@prisma/client';

export interface MessageRepository {
  createRoom(text: string, userId: string, roomId: number): Promise<Message>;

  listByRoom(roomId: number): Promise<Message[]>;

  createConversation(
    text: string,
    userId: string,
    conversationwId: number,
  ): Promise<Message>;

  listByConversation(conversationId: number): Promise<Message[]>;
}
