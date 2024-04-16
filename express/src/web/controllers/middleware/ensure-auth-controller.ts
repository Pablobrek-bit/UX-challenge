import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { env } from '../../../env';
import { AuthTokenMissingError } from '../../../services/errors/auth-token-missing-error';

export class EnsureAuthController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AuthTokenMissingError();
    }

    const [, token] = authHeader.split(' ');

    try {
      const { sub: user_id } = verify(token, env.JWT_SECRET);

      req.body.user = {
        id: user_id,
      };

      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
