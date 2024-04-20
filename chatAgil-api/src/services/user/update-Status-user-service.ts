import { UserRepository } from '../../repository/interfaces/user-repository';
import { UserNotExistsError } from '../errors/user/user-not-exists-error';

interface UpdateStatusUserServiceRequest {
  id: string;
  status: 'online' | 'offline';
}

export class UpdateStatusUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ id, status }: UpdateStatusUserServiceRequest) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotExistsError();
    }

    await this.userRepository.updateStatus(id, status);
  }
}
