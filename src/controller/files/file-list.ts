import asController from '../../util/as-controller';
import { File } from '../../database/tables/file';
import { User } from '../../database/tables/user';

export const getFileList = asController(async (req, res) => {
    const page = !!req.query.page ? req.query.page : 1;
    console.log(1)
    
    File.belongsTo(User, {
        foreignKey: "userId"
        });
    try {
        const file = await File.findAll({
            attributes: ['userId', 'id', 'created', 'name', 'downloads', 'uploadTime'],
            include: [{
                model: User,
                attributes: ['nickname'],
                required: true
            }],
            offset: (Number(page) - 1) * 10,
            limit: 10,
            order: [
                ['id', 'ASC']
            ]
        })
        const fileCount = await File.count();
    
        const fileList = [];
        for (let i = 0; i < file.length; i++) {
            fileList.push({
                id: file[i].id,
                userId: file[i].userId,
                nickname: file[i].User.nickname,
                created: file[i].created,
                name: file[i].name,
                download: file[i].downloads,
                uploadTime: file[i].uploadTime
            })
        }
        res.json({ fileCount: fileCount, files: fileList });
        return;
    } catch (e) {
        res.sendStatus(404);
    }
})