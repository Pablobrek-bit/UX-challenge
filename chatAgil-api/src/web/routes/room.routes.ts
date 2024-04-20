import { Router } from 'express';
import { RoomController } from '../controllers/room/room-controller';
import { EnsureAuthController } from '../controllers/middleware/ensure-auth-controller';

const roomRoutes = Router();
const roomController = new RoomController();
const ensureAuthenticated = new EnsureAuthController();

roomRoutes.get('/:id', roomController.get);

roomRoutes.get('/', roomController.index);

roomRoutes.post('/', ensureAuthenticated.handle, roomController.create);

roomRoutes.delete('/:id', ensureAuthenticated.handle, roomController.delete);

roomRoutes.put('/join/:id', ensureAuthenticated.handle, roomController.join);

roomRoutes.get(
  '/user-in-room/:id',
  ensureAuthenticated.handle,
  roomController.userInRoom,
);

export { roomRoutes };
