import { User } from '@prisma/client';
import { UserRepository } from '../../repository/interfaces/user-repository';
import { hash } from 'bcryptjs';
import { UserEmailAlreadyExistsError } from '../errors/user/user-email-already-exists-error';
import { UserCredentialsIncorrectError } from '../errors/user/user-credentials-incorrect-error';

interface CreateUserRepositoryResponse {
  user: User;
}

interface CreateUserRepositoryRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserRepositoryRequest): Promise<CreateUserRepositoryResponse> {
    const hashedPassword = await hash(password, 6);

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (!name || !email || !password) {
      throw new UserCredentialsIncorrectError();
    }

    if (userAlreadyExists) {
      throw new UserEmailAlreadyExistsError();
    }

    const user = await this.userRepository.create({
      name,
      email,
      hashedPassword,
    });

    return {
      user,
    };
  }
}
