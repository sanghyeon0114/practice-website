import asController from '../../util/as-controller';
import { findUser } from '../../util/database/find-data';

export const getUser = asController(async (req, res) => {
    let user: undefined | any;
    if (req.user) {
        try {
            user = await findUser(req.user.id);
            console.log(user)
        } catch {
            return;
        }
        res.json({ nickname: user.nickname, id: user.id });
        return;
    } else {
        res.sendStatus(400);
    }
})