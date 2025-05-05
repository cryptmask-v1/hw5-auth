import express from 'express';
import { pinoHttp } from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import contactsRouter from './routes/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRouter from './routes/auth.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = process.env.PORT;

export const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());

  app.use(express.json());
  app.use(
    pinoHttp({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('/contacts', contactsRouter);

  app.use('/auth', authRouter); // Add this line to include the auth routes

  //404 error handler
  app.use(notFoundHandler);

  // error handler
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};
