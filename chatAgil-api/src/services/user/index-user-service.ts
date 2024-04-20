import { UserRepository } from '../../repository/interfaces/user-repository';

export class IndexUserService {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    const users = await this.userRepository.index();

    return { users };
  }
}
