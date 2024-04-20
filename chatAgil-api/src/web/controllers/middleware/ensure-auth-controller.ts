import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { env } from '../../../env';
import { AuthTokenMissingError } from '../../../services/errors/user/auth-token-missing-error';

export class EnsureAuthController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    try {
      if (!authHeader) {
        throw new AuthTokenMissingError();
      }

      const [, token] = authHeader.split(' ');

      const { sub: user_id } = verify(token, env.JWT_SECRET);

      req.body.user = {
        id: user_id,
      };

      return next();
    } catch (err) {
      if (err instanceof AuthTokenMissingError) {
        return res.status(401).json({ message: 'Token is missing' });
      } else {
        return res.status(401).json({ message: 'Invalid token' });
      }
    }
  }
}
