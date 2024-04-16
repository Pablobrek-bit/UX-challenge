import { UserRepository } from '../../repository/interfaces/user-repository';

interface LoginUserServiceRequest {
  id: string;
  roomId: number;
  password?: string;
}

export class LoginUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
    roomId,
    password,
  }: LoginUserServiceRequest): Promise<void> {}
}
