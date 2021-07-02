import asController from '../../util/as-controller';
import { comparePw } from "../../cipher";
import jwt from 'jsonwebtoken';
import { secret } from '../../middleware/verify';
import { findUser } from '../../util/database/find-data';

export const login = asController(async (req, res) => {
    let user: any | undefined;
    try {
        user = await findUser(req.body.id);
        console.log(user)
    } catch {
        res.sendStatus(500);
        return;
    }
    if (!req.user && user && comparePw(req.body.password, user.password)) {
        let token = jwt.sign({
            nickname: user.nickname,
            id: user.id
        }, secret, {
            expiresIn: '30m'
        })
        res.json({ token });
        return;
    } else {
        res.sendStatus(400);
        return;
    }
})



