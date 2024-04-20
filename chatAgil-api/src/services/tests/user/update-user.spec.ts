import { hash } from 'bcryptjs';
import { describe, it, expect, beforeEach } from 'vitest';
import { AuthUserService } from '../../user/auth-user-service';
import { UserInMemoryRepository } from '../../../repository/in-memory/user-in-memory-repository';
import { UserNotExistsError } from '../../errors/user/user-not-exists-error';

describe('Update user service', () => {
  let userRepository: UserInMemoryRepository;

  beforeEach(async () => {
    userRepository = new UserInMemoryRepository();

    await userRepository.create({
      name: 'Pedro',
      email: 'pedro@gmail.com',
      hashedPassword: await hash('123456', 6),
    });
  });

  it('should be able update user status', async () => {
    const user = await userRepository.findByEmail('pedro@gmail.com');

    console.log(user);

    if (!user) throw new UserNotExistsError();

    await userRepository.updateStatus(user.id);

    const userUpdated = await userRepository.findById(user.id);

    console.log(userUpdated);

    expect(userUpdated?.status).toBe('ONLINE');
  });

  it('should be able update user status to offline', async () => {
    const user = await userRepository.findByEmail('pedro@gmail.com');

    console.log(user);

    if (!user) throw new UserNotExistsError();

    await userRepository.updateStatus(user.id);

    await userRepository.updateStatus(user.id);

    const userUpdated = await userRepository.findById(user.id);

    expect(userUpdated?.status).toBe('OFFLINE');
  });
});
