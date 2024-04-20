import { UserStatus } from '@prisma/client';
import { UserRepository } from '../../repository/interfaces/user-repository';

interface GetOnUserServiceResponse {
  id: string;
  name: string;
  status: UserStatus;
}

export class GetOnUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<GetOnUserServiceResponse[]> {
    const users = await this.userRepository.getOn();

    return users;
  }
}
