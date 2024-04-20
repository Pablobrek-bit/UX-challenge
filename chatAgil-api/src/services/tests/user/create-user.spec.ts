import { describe, it, expect } from 'vitest';
import { CreateUserService } from '../../user/create-user-service';
import { UserInMemoryRepository } from '../../../repository/in-memory/user-in-memory-repository';
import { UserEmailAlreadyExistsError } from '../../errors/user/user-email-already-exists-error';
import { compare } from 'bcryptjs';

describe('Create user service', () => {
  it('should create a user', async () => {
    const userInMemoryRepository = new UserInMemoryRepository();
    const createUserService = new CreateUserService(userInMemoryRepository);

    const { user } = await createUserService.execute({
      name: 'Pedro',
      email: 'pedro@gmail.com',
      password: '123456',
    });

    console.log(user);

    expect(user).toEqual({
      id: expect.any(String),
      name: 'Pedro',
      email: 'pedro@gmail.com',
      hashedPassword: expect.any(String),
      status: 'OFFLINE',
      createdAt: expect.any(Date),
    });
  });

  it('should not create a user with the same email', async () => {
    const userInMemoryRepository = new UserInMemoryRepository();
    const createUserService = new CreateUserService(userInMemoryRepository);

    const user = await createUserService.execute({
      name: 'Pedro',
      email: 'pedro@gmail.com',
      password: '123456',
    });

    await expect(async () => {
      await createUserService.execute({
        name: 'Pedro',
        email: 'pedro@gmail.com',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(UserEmailAlreadyExistsError);
  });

  it('should hash the password upon user creation', async () => {
    const userInMemoryRepository = new UserInMemoryRepository();
    const createUserService = new CreateUserService(userInMemoryRepository);

    const { user } = await createUserService.execute({
      name: 'Pedro',
      email: 'pedro@gmail.com',
      password: '123456',
    });

    const isPasswordHashed = await compare('123456', user.hashedPassword);

    expect(isPasswordHashed).toBe(true);
  });
});
