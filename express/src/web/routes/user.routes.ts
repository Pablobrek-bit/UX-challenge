import { Application, Router } from 'express';
import { UserController } from '../controllers/user/user-controller';
import { EnsureAuthController } from '../controllers/middleware/ensure-auth-controller';

const userController = new UserController();
const authMiddleware = new EnsureAuthController();
export const userRoutes = Router();

//To Do: type the request for the token
userRoutes.post('/', userController.create);
userRoutes.get('/index', userController.index); //To Do: test this route
userRoutes.get('/', authMiddleware.handle, userController.get); //To Do: test this route
//entrar em uma sala
userRoutes.post('/login/:idRoom', authMiddleware.handle, () => {});
