import { z } from 'zod';
import { Request, Response } from 'express';
import { CreateUserService } from '../../../services/user/create-user-service';
import { UserRepositoryPrisma } from '../../../repository/prisma/user-repository-prisma';
import { UserEmailAlreadyExistsError } from '../../../services/errors/user/user-email-already-exists-error';
import { IndexUserService } from '../../../services/user/index-user-service';
import { GetUserService } from '../../../services/user/get-user-service';
import { UserNotExistsError } from '../../../services/errors/user/user-not-exists-error';
import { UpdateStatusUserService } from '../../../services/user/update-Status-user-service';
import { GetOnUserService } from '../../../services/user/get-on-user-service';

export class UserController {
  async create(request: Request, res: Response) {
    const requestSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = requestSchema.parse(request.body);

    const createUserService = new CreateUserService(new UserRepositoryPrisma());

    try {
      const user = await createUserService.execute({
        name,
        email,
        password,
      });

      return res.status(201).json({ user });
    } catch (error) {
      if (error instanceof UserEmailAlreadyExistsError) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: 'Internal Server Error' });
    }
  }

  async index(req: Request, res: Response) {
    const userRepository = new UserRepositoryPrisma();
    const indexUserService = new IndexUserService(userRepository);

    try {
      const { users } = await indexUserService.execute();
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(400).json({ message: 'Internal Server Error' });
    }
  }

  async get(req: Request, res: Response) {
    const { id } = req.body.user;
    const userRepository = new UserRepositoryPrisma();
    const getUserService = new GetUserService(userRepository);

    try {
      const user = await getUserService.execute(id);
      return res.status(200).json({ user });
    } catch (error) {
      if (error instanceof UserNotExistsError) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(400).json({ message: 'Internal Server Error' });
    }
  }

  async updateStatus(req: Request, res: Response) {
    const requestSchema = z.object({
      status: z.enum(['online', 'offline']),
    });
    const { id } = req.body.user;

    const { status } = requestSchema.parse(req.body);

    const userRepository = new UserRepositoryPrisma();
    const updateStatus = new UpdateStatusUserService(userRepository);

    try {
      await updateStatus.execute({ id, status });
      return res.status(204).json({ message: 'User status updated' });
    } catch (error) {
      if (error instanceof UserNotExistsError) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(400).json({ message: 'Internal Server Error' });
    }
  }
  async getOn(req: Request, res: Response) {
    const userRepository = new UserRepositoryPrisma();
    const getOnUserService = new GetOnUserService(userRepository);

    try {
      const users = await getOnUserService.execute();
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(400).json({ message: 'Internal Server Error' });
    }
  }
}
