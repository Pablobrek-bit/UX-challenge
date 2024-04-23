import { app } from './app';
import { env } from './env';
import { createServer } from 'http';
import { Server as IoServer } from 'socket.io';
import setupSockets from './sockets/setupSockets';

const httpServer = createServer(app);

export const io = new IoServer(httpServer, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

setupSockets(io);

httpServer.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT} 🚀`);
});
