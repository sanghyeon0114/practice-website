import { Router } from "express";
import { register } from '../controller/user/register';
import { getUser } from '../controller/user/get-user';
import { fileList } from '../controller/user/file-list';
const userRouter = Router();

userRouter.post('/me', register);
userRouter.get('/info', getUser);
userRouter.post('/file-list', fileList);

export default userRouter;

