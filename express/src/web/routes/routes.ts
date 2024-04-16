import { Router } from 'express';
import { userRoutes } from './user.routes';
import { authRoutes } from './auth.routes';
import { roomRoutes } from './room.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);
routes.use('/room', roomRoutes);

export { routes };
