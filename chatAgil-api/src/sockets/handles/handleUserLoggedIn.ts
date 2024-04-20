import { Socket } from 'socket.io';
import { UserRepositoryPrisma } from '../../repository/prisma/user-repository-prisma';
import { UpdateStatusUserService } from '../../services/user/update-Status-user-service';

export default function handleUserLoggedIn(socket: Socket): Promise<string> {
  return new Promise((resolve, reject) => {
    socket.on('userLoggedIn', ({ id, status }) => {
      const userRepository = new UserRepositoryPrisma();
      const userUpdateService = new UpdateStatusUserService(userRepository);

      console.log('connected', id);
      userUpdateService.execute({ id, status });

      resolve(id);
    });

    socket.on('error', reject);
  });
}
