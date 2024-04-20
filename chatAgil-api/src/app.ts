import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { routes } from './web/routes/routes';
import cors from 'cors';
import 'express-async-errors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('entrou aqui');
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

export { app };
