import asController from '../../util/as-controller';
import { removeFile } from '../../util/database/destroy-data';


export const fileDelete = asController(async (req, res) => {
    await removeFile(req.params.id);
    res.sendStatus(200);
})