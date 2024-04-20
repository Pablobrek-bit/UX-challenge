import { Request, Response } from 'express';
import z from 'zod';
import { AuthUserService } from '../../../services/user/auth-user-service';
import { UserRepositoryPrisma } from '../../../repository/prisma/user-repository-prisma';
import { UserCredentialsIncorrectError } from '../../../services/errors/user/user-credentials-incorrect-error';

export class AuthController {
  async login(request: Request, response: Response) {
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = loginSchema.parse(request.body);

    const authUserService = new AuthUserService(new UserRepositoryPrisma());

    try {
      const { token, user } = await authUserService.execute({
        email,
        password,
      });

      return response.status(200).json({ token, user });
    } catch (error) {
      if (error instanceof UserCredentialsIncorrectError) {
        return response.status(400).json({ message: error.message });
      }
    }
  }
}
