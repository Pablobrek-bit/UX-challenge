import { describe, it, expect, beforeEach } from 'vitest';

import { UserInMemoryRepository } from '../../../repository/in-memory/user-in-memory-repository';
import { AuthUserService } from '../../user/auth-user-service';
import { hash } from 'bcryptjs';
import { UserCredentialsIncorrectError } from '../../errors/user/user-credentials-incorrect-error';
import { UserNotExistsError } from '../../errors/user/user-not-exists-error';

describe('Auth user service', () => {
  let userRepository: UserInMemoryRepository;
  let authUserService: AuthUserService;

  beforeEach(async () => {
    userRepository = new UserInMemoryRepository();
    authUserService = new AuthUserService(userRepository);

    await userRepository.create({
      name: 'Pedro',
      email: 'pedro@gmail.com',
      hashedPassword: await hash('123456', 6),
    });
  });

  it('should authenticate a user', async () => {
    const { token } = await authUserService.execute({
      email: 'pedro@gmail.com',
      password: '123456',
    });

    expect(token).toBeDefined();
  });

  it('should not authenticate a user with wrong password', async () => {
    await expect(async () => {
      await authUserService.execute({
        email: 'pedro@gmail.com',
        password: '1234567',
      });
    }).rejects.toBeInstanceOf(UserCredentialsIncorrectError);
  });

  it('should not authenticate a user with wrong email', async () => {
    await expect(async () => {
      await authUserService.execute({
        email: 'pedrohenrique@gmail.com',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(UserCredentialsIncorrectError);
  });
});
