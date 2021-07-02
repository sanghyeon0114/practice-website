import asController from '../../util/as-controller';
import isUsePassword from '../../util/isUsePassword';
import { cipher } from "../../cipher";
import { addUser } from '../../util/database/add-data';

export const register = asController(async (req, res) => {
    const nickname = req.body.nickname;
    const id = req.body.id;
    const password = req.body.password;

    if (isUsePassword(nickname) && isUsePassword(id) && isUsePassword(password)) {
        try {
            await addUser(nickname, id, await cipher(password));
        } catch {
            res.sendStatus(400);
            return;
        }
        res.sendStatus(201);
        return;
    } else {
        res.sendStatus(400);
        return;
    }
})