import { Router } from "express";
import { login } from '../controller/auth/login';

const authRouter = Router();

authRouter.post('/', login);

export default authRouter;