import { compare } from 'bcryptjs';
import { UserRepository } from '../../repository/interfaces/user-repository';
import { UserCredentialsIncorrectError } from '../errors/user-credentials-incorrect-error';
import jwt from 'jsonwebtoken';
import { env } from '../../env';

interface AuthUserServiceResponse {
  token: string;
}

interface AuthUserServiceRequest {
  email: string;
  password: string;
}

export class AuthUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthUserServiceRequest): Promise<AuthUserServiceResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserCredentialsIncorrectError();
    }

    const isPasswordCorrect = await compare(password, user.hashedPassword);

    if (!isPasswordCorrect) {
      throw new UserCredentialsIncorrectError();
    }

    const token = jwt.sign({}, env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      token,
    };
  }
}
