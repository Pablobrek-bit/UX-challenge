import { Request, Response } from 'express';
import z from 'zod';
import { MessageRepositoryPrisma } from '../../../repository/prisma/message-repository-prisma';
import { CreateRoomMessageService } from '../../../services/messages/create-room-message-service';
import { GetRoomMessageService } from '../../../services/messages/get-room-message-service';
import { CreateConversationMessageService } from '../../../services/messages/create-conversation-message-service';
import { GetConversationMessageService } from '../../../services/messages/get-conversation-message-service';
import { MessageCredentialsIncorrectError } from '../../../services/errors/message/message-credentials-incorrect-error';
import { RoomUserNotInRoomError } from '../../../services/errors/room/room-user-not-in-room-error';

export class MessagesController {
  async createRoomMessage(req: Request, res: Response) {
    const { id } = req.body.user;
    const { idRoom } = req.params;
    const requestSchema = z.object({
      message: z.string(),
    });

    const { message } = requestSchema.parse(req.body);

    const messageRepository = new MessageRepositoryPrisma();
    const createMessageService = new CreateRoomMessageService(
      messageRepository,
    );

    try {
      const { message: messageCreated } = await createMessageService.execute({
        message,
        roomId: Number(idRoom),
        userId: id,
      });

      return res.status(201).json(messageCreated);
    } catch (error) {
      if (error instanceof MessageCredentialsIncorrectError) {
        return res.status(400).json({ message: error.message });
      } else if (error instanceof RoomUserNotInRoomError) {
        return res.status(401).json({ message: error.message });
      }
      return res.status(400).json({ message: 'Internal server error' });
    }
  }

  async getRoomMessages(req: Request, res: Response) {
    const { idRoom } = req.params;

    const messageRepository = new MessageRepositoryPrisma();
    const getRoomMessages = new GetRoomMessageService(messageRepository);

    try {
      const { messages } = await getRoomMessages.execute({
        roomId: Number(idRoom),
      });

      return res.status(200).json(messages);
    } catch (error) {
      return res.status(400).json({ message: 'Internal server error' });
    }
  }

  async createConversationMessage(req: Request, res: Response) {
    const { id } = req.body.user;
    const { idConversation } = req.params;
    const requestSchema = z.object({
      message: z.string(),
    });

    const { message } = requestSchema.parse(req.body);

    const messageRepository = new MessageRepositoryPrisma();
    const createMessageService = new CreateConversationMessageService(
      messageRepository,
    );

    try {
      const { message: messageCreated } = await createMessageService.execute({
        message,
        conversationId: Number(idConversation),
        userId: id,
      });

      return res.status(201).json(messageCreated);
    } catch (error) {
      if (error instanceof MessageCredentialsIncorrectError) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: 'Internal server error' });
    }
  }

  async getConversationMessages(req: Request, res: Response) {
    const { idConversation } = req.params;

    const messageRepository = new MessageRepositoryPrisma();
    const getConversationMessages = new GetConversationMessageService(
      messageRepository,
    );

    try {
      const { messages } = await getConversationMessages.execute({
        conversationId: Number(idConversation),
      });

      return res.status(200).json(messages);
    } catch (error) {
      return res.status(400).json({ message: 'Internal server error' });
    }
  }
}
