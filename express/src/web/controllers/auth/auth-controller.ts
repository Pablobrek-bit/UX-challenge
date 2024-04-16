import { Request, Response } from 'express';
import z from 'zod';
import { AuthUserService } from '../../../services/user/auth-user-service';
import { UserRepositoryPrisma } from '../../../repository/prisma/user-repository-prisma';

export class AuthController {
  async login(request: Request, response: Response) {
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = loginSchema.parse(request.body);

    const authUserService = new AuthUserService(new UserRepositoryPrisma());

    try {
      const { token } = await authUserService.execute({
        email,
        password,
      });

      return response.status(200).json({ token });
    } catch (error) {
      return response.status(400).json({ message: 'Internal Server Error' });
    }
  }
}
