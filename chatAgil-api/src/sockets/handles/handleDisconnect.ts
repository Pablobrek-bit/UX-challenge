import { UserRepositoryPrisma } from '../../repository/prisma/user-repository-prisma';
import { UpdateStatusUserService } from '../../services/user/update-Status-user-service';
import { SocketInterface } from '../setupSockets';

export default function handleDisconnect(socket: SocketInterface) {
  socket.on('disconnect', () => {
    const userRepository = new UserRepositoryPrisma();
    const userUpdateService = new UpdateStatusUserService(userRepository);

    if (!socket.idUser) {
      return;
    }

    console.log('disconnected', socket.idUser);
    userUpdateService.execute({ id: socket.idUser, status: 'offline' });
  });
}
