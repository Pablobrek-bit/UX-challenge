import { Router } from 'express';
import { MessagesController } from '../controllers/messages/messages-controller';
import { EnsureAuthController } from '../controllers/middleware/ensure-auth-controller';

const messagesRoutes = Router();
const messagesController = new MessagesController();
const ensureAuthenticated = new EnsureAuthController();

messagesRoutes.post(
  '/room/:idRoom',
  ensureAuthenticated.handle,
  messagesController.createRoomMessage,
);

messagesRoutes.get(
  '/room/:idRoom',
  ensureAuthenticated.handle,
  messagesController.getRoomMessages,
);

messagesRoutes.post(
  '/conversation/:idConversation',
  ensureAuthenticated.handle,
  messagesController.createConversationMessage,
);

messagesRoutes.get(
  '/conversation/:idConversation',
  ensureAuthenticated.handle,
  messagesController.getConversationMessages,
);

export default messagesRoutes;
