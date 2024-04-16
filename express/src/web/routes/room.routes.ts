import { Router } from 'express';
import { RoomController } from '../controllers/room/room-controller';
import { EnsureAuthController } from '../controllers/middleware/ensure-auth-controller';

const roomRoutes = Router();
const roomController = new RoomController();
const ensureAuthenticated = new EnsureAuthController();

//listar todas as salas
roomRoutes.get('/index', roomController.index); //To-Do: Test this route

//criar nova sala
roomRoutes.post('/', ensureAuthenticated.handle, roomController.create); //To-Do: Test this route

//deletar uma sala
roomRoutes.delete('/:id', ensureAuthenticated.handle, roomController.delete);
//To-Do fazer verificação se o usuário é o dono da sala

//entrar em uma sala
roomRoutes.put('/join/:id', ensureAuthenticated.handle, roomController.join);

//obter as mensagens de uma sala

//adicionar uma mensagem a uma sala

export { roomRoutes };
