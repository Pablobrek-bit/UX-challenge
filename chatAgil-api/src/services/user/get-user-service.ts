import { UserRepository } from '../../repository/interfaces/user-repository';
import { User } from '@prisma/client';
import { UserNotExistsError } from '../errors/user/user-not-exists-error';

interface GetUserServiceResponse {
  user: User;
}

export class GetUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<GetUserServiceResponse | null> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotExistsError();
    }

    return { user };
  }
}
