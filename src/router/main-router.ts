import { Router } from 'express';
import userRouter from './users-router';
import authRouter from './auth-router';
import fileRouter from './files-router';

const mainRouter = Router();

mainRouter.use('/users', userRouter);
mainRouter.use('/auth', authRouter);
mainRouter.use('/files', fileRouter);

export default mainRouter;
