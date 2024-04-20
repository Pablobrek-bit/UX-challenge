import { Router } from 'express';
import { userRoutes } from './user.routes';
import { authRoutes } from './auth.routes';
import { roomRoutes } from './room.routes';
import messagesRoutes from './messages.routes';
import { conversationRoutes } from './conversation.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);
routes.use('/room', roomRoutes);
routes.use('/message', messagesRoutes);
routes.use('/conversation', conversationRoutes);

export { routes };
