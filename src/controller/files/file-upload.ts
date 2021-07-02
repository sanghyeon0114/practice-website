import asController from '../../util/as-controller';
import { encryptFile, makeHashCode } from "../../cipher";
import fs from 'fs/promises';
import path from 'path';
import { addFile } from '../../util/database/add-data';

export const fileUpload = asController(async (req, res) => {
    const today = new Date();

    if(!req.file) {
        res.sendStatus(400);
        return;
    }
    const post = {
        userId: req.user?.id,
        created: today,
        uploadTime: req.user !== undefined ? (req.body.uploadTime === undefined ? null : req.body.uploadTime) : 1,
        hashCode: makeHashCode(req.file.buffer),
        path: path.join('uploads', `${Date.now()}`),
    }
    let iv: string | null = null;

    if (req.body.password) {
        iv = await encryptFile(req.file.buffer, post.path, req.body.password);
    } else {
        await fs.writeFile(post.path, req.file.buffer);
    }
    
    try {
        await addFile(post.userId, post.created, req.file.originalname, 0, post.path, post.uploadTime, post.hashCode, iv);
    } catch(e) {
        res.sendStatus(400);
        return;
    }

    res.sendStatus(201);
})

