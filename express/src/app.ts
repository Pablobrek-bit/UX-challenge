import express from 'express';
import { userRoutes } from './web/routes/user.routes';
import { routes } from './web/routes/routes';

const app = express();

app.use(express.json());

app.use(routes);

export { app };
