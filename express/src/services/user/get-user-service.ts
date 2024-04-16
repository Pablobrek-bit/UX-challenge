import { UserRepository } from '../../repository/interfaces/user-repository';
import { User } from '@prisma/client';

interface GetUserServiceResponse {
  user: User;
}

export class GetUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<GetUserServiceResponse | null> {
    const user = await this.userRepository.findById(id);

    if (!user) return null;

    return { user };
  }
}
