import { Request, Response, NextFunction, Router } from "express";
import jwt from 'jsonwebtoken';

export const verifyRouter = Router();

export const secret = "248yn49ykdjghb89365";

interface UserData {
    id: string
}

export const verifyMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    let authorization: string | undefined = req.headers.authorization;

    if (authorization) {
        if (authorization.startsWith("Bearer ")) {
            authorization = authorization.substring(7);
        }
        jwt.verify(authorization, secret, (err, user) => {
            if (err) {
                res.sendStatus(400);
            } else {
                req.user = user as UserData;
                next();
            }
        });
    } else {
        next()
    }
}

declare global {
    namespace Express {
        interface Request {
            user?: UserData;
        }
    }
}