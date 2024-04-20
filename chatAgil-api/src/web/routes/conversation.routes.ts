import { Router } from 'express';
import { EnsureAuthController } from '../controllers/middleware/ensure-auth-controller';
import { ConversationController } from '../controllers/conversation/conversation-controller';

const conversationRoutes = Router();
const ensureAuthenticated = new EnsureAuthController();
const conversationController = new ConversationController();

conversationRoutes.post(
  '/:idUser',
  ensureAuthenticated.handle,
  conversationController.create,
);

conversationRoutes.get(
  '/',
  ensureAuthenticated.handle,
  conversationController.index,
);

conversationRoutes.get(
  '/:id',
  ensureAuthenticated.handle,
  conversationController.get,
);

export { conversationRoutes };
