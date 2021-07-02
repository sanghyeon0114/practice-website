import asController from '../../util/as-controller';
import isDownload from '../../util/isDownload';
import { findFile } from '../../util/database/find-data';

export const getfileInfo = asController(async (req, res) => {
    const fileId = req.params.id;
    try {
        
        const fileInfo = await findFile(fileId);
        
        if(!fileInfo) {
            res.sendStatus(400);
            return;
        }

        const canDownload: boolean = isDownload(fileInfo.created, fileInfo.uploadTime);

        res.json({
            canDownload: canDownload,
            fileInfo: canDownload ? {
                userId: fileInfo.userId,
                created: fileInfo.created,
                fileName: fileInfo.name,
                downloads: fileInfo.downloads,
                uploadTime: fileInfo.uploadTime
            } : fileInfo.name
        });

    } catch {
        res.sendStatus(406);
    }
})

