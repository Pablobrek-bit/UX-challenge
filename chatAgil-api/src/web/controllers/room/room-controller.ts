import z from 'zod';
import { RoomRepositoryPrisma } from '../../../repository/prisma/room-repository-prisma';
import { CreateRoomService } from '../../../services/room/create-room-service';
import { IndexRoomService } from '../../../services/room/index-room-service';
import { Request, Response } from 'express';
import { DeleteRoomService } from '../../../services/room/delete-room-service';
import { JoinRoomService } from '../../../services/room/join-room-service';
import { RoomCredentialsIncorrectError } from '../../../services/errors/room/room-credentials-incorrect-error';
import { RoomNotExistsError } from '../../../services/errors/room/room-not-exists-error';
import { GetRoomService } from '../../../services/room/get-room-service';

export class RoomController {
  async index(req: Request, res: Response) {
    const roomRepository = new RoomRepositoryPrisma();
    const indexRoomService = new IndexRoomService(roomRepository);

    console.log('chegou no controller index');

    try {
      const { rooms } = await indexRoomService.execute();

      return res.status(200).json(rooms);
    } catch (err) {
      console.log(err);
      throw new Error('Failed to get rooms');
    }
  }

  async create(req: Request, res: Response) {
    const createSchema = z.object({
      name: z.string(),
      password: z.string().optional(),
    });
    const { id } = req.body.user;
    console.log('id', id);

    const { name, password } = createSchema.parse(req.body);

    const roomRepository = new RoomRepositoryPrisma();
    const createRoomService = new CreateRoomService(roomRepository);

    try {
      const { room } = await createRoomService.execute({
        name,
        password,
        user: id,
      });

      return res.status(201).json(room);
    } catch (err) {
      if (err instanceof RoomCredentialsIncorrectError) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(400).json({ error: 'Erro ao criar a sala' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const roomRepository = new RoomRepositoryPrisma();
    const deleteRoomService = new DeleteRoomService(roomRepository);

    try {
      await deleteRoomService.execute({ id: Number(id) });

      return res.status(200).json({ message: 'Sala deletada com sucesso' });
    } catch (err) {
      if (err instanceof RoomCredentialsIncorrectError) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(400).json({ error: 'Erro ao deletar a sala' });
    }
  }

  async join(req: Request, res: Response) {
    const { id } = req.params;
    const { id: userId } = req.body.user;
    const requestSchema = z.object({
      password: z.string().min(6).optional(),
    });

    const { password } = requestSchema.parse(req.body);

    const roomRepository = new RoomRepositoryPrisma();
    const joinRoomService = new JoinRoomService(roomRepository);

    try {
      await joinRoomService.execute({
        id: Number(id),
        userId,
        password,
      });

      return res.status(200).json({ message: 'Join the room' });
    } catch (err) {
      if (
        err instanceof RoomCredentialsIncorrectError ||
        err instanceof RoomNotExistsError
      ) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(400).json({ error: 'Erro ao entrar na sala' });
    }
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;

    const roomRepository = new RoomRepositoryPrisma();
    const getRoomService = new GetRoomService(roomRepository);

    try {
      const { room } = await getRoomService.execute({ id: Number(id) });

      return res.status(200).json(room);
    } catch (err) {
      if (err instanceof RoomNotExistsError) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(400).json({ error: 'Erro ao pegar a sala' });
    }
  }

  async userInRoom(req: Request, res: Response) {
    const { id } = req.params;
    const { id: userId } = req.body.user;

    const roomRepository = new RoomRepositoryPrisma();

    try {
      const userInRoom = await roomRepository.userInRoom(userId, Number(id));

      return res.status(200).json({ userInRoom });
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Erro ao verificar se o usuário está na sala' });
    }
  }
}
