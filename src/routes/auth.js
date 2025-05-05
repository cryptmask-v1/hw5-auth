import { Router } from 'express';
import { validateBody } from '../middlewares/validatorBody.js';
import { ctrlWrapper } from '../utils/crtlWrapper.js';
import { createUserSchema, loginUserSchema } from '../validators/users.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserController,
  registerUserController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(createUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/refresh', ctrlWrapper(refreshUserController));

export default authRouter;
