import { Request, Response } from 'express';
import { ConversationRepositoryPrisma } from '../../../repository/prisma/conversation-repository-prisma';
import { CreateConversationService } from '../../../services/conversation/create-conversation-service';
import { IndexConversationService } from '../../../services/conversation/index-conversation-service';
import { GetConversationService } from '../../../services/conversation/get-conversation-service';
import { ConversationNotExistsError } from '../../../services/errors/conversation/conversation-not-exist-error';

export class ConversationController {
  async create(req: Request, res: Response) {
    const { id } = req.body.user;
    const { idUser } = req.params;

    const conversationRepository = new ConversationRepositoryPrisma();
    const createConversationService = new CreateConversationService(
      conversationRepository,
    );

    try {
      const conversation = await createConversationService.execute({
        id,
        idUser,
      });

      return res.status(201).send(conversation);
    } catch (err) {
      return res.status(400).send({ err });
    }
  }

  async index(req: Request, res: Response) {
    const { id } = req.body.user;

    const conversationRepository = new ConversationRepositoryPrisma();
    const indexConversationService = new IndexConversationService(
      conversationRepository,
    );

    const { conversations } = await indexConversationService.execute({
      userId: id,
    });

    return res.status(200).send(conversations);
  }

  async get(req: Request, res: Response) {
    const { id } = req.body.user;
    const { id: idUser } = req.params;

    const conversationRepository = new ConversationRepositoryPrisma();
    const getConversationService = new GetConversationService(
      conversationRepository,
    );

    try {
      const conversation = await getConversationService.execute({
        id: idUser,
        idUser: id,
      });
      return res.status(200).send(conversation);
    } catch (e) {
      if (e instanceof ConversationNotExistsError) {
        return res.status(404).send({ message: 'Conversa não encontrada' });
      }
      return res.status(404).send({ message: 'Conversa não encontrada' });
    }
  }
}
