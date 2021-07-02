import asController from '../../util/as-controller';
import { decryptFile, makeHashCode } from "../../cipher";
import isDownload from '../../util/isDownload';
import { findFile } from '../../util/database/find-data';
import { File } from '../../database/tables/file';

export const fileDownload = asController(async (req, res) => {
    const fileId = req.params.id;
    const password = req.body.password;
    const fileInfo = await findFile(fileId);
    if (!fileInfo) {
        res.sendStatus(400);
        return;
    } else {
        const canDownload: boolean = isDownload(fileInfo.created, fileInfo.uploadTime);
        const fileName = fileInfo.name;
        let decrypted: Buffer;
        console.log(fileName)
        try {
            decrypted = await decryptFile(fileInfo.link, password, fileInfo.iv);
        } catch (e) {
            res.sendStatus(406);
            return;
        }
        const hash = makeHashCode(decrypted)
        if (canDownload && (!fileInfo.hashCode || hash === fileInfo.hashCode)) {
            File.update({
                downloads: fileInfo.downloads + 1
            }, {
                where: {
                    id: fileId
                }
            })
            res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
            res.setHeader('Content-Type', 'application/octet-stream');
            res.send(decrypted);
        } else {
            console.log(canDownload && (!fileInfo.hashCode || hash === fileInfo.hashCode))
            res.sendStatus(406);
        }
    }

})

