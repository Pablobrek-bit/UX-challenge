import { User } from '@prisma/client';
import { UserRepository } from '../../repository/interfaces/user-repository';

interface UserResponse {
  users: User[];
}

export class IndexUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<UserResponse> {
    const users = await this.userRepository.index();

    return { users };
  }
}
