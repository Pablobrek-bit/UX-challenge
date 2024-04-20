import { Application, Router } from 'express';
import { UserController } from '../controllers/user/user-controller';
import { EnsureAuthController } from '../controllers/middleware/ensure-auth-controller';

const userController = new UserController();
const authMiddleware = new EnsureAuthController();
export const userRoutes = Router();

userRoutes.post('/', userController.create);
userRoutes.get('/index', userController.index);
userRoutes.get('/', authMiddleware.handle, userController.get);
userRoutes.put('/status', authMiddleware.handle, userController.updateStatus);
userRoutes.get('/on', authMiddleware.handle, userController.getOn);
