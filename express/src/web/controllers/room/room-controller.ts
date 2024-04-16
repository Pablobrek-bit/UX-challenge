import z from 'zod';
import { RoomRepositoryPrisma } from '../../../repository/prisma/room-repository-prisma';
import { CreateRoomService } from '../../../services/room/create-room-service';
import { IndexRoomService } from '../../../services/room/index-room-service';
import { Request, Response } from 'express';
import { DeleteRoomService } from '../../../services/room/delete-room-service';
import { JoinRoomService } from '../../../services/room/join-room-service';

export class RoomController {
  async index(req: Request, res: Response) {
    const roomRepository = new RoomRepositoryPrisma();
    const getRoomService = new IndexRoomService(roomRepository);

    try {
      const { rooms } = await getRoomService.execute();

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
      console.log(err);
      return res.status(400).json({ error: 'Erro ao criar a sala' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const roomRepository = new RoomRepositoryPrisma();
    const deleteRoomService = new DeleteRoomService(roomRepository);

    try {
      const { room } = await deleteRoomService.execute({ id: Number(id) });

      return res.status(200).json(room);
    } catch (err) {
      console.log(err);
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
      console.log(err);
      return res.status(400).json({ error: 'Erro ao entrar na sala' });
    }
  }
}
