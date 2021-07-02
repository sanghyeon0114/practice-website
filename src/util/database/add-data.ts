import { User } from '../../database/tables/user';
import { File } from '../../database/tables/file';

export async function addUser(id: string, nickname: string, password: string) {
    await User.create({
        id: id,
        nickname: nickname,
        password: password
    })
}

export async function addFile(userId: any, created: any, filename: string, downloads: Number, filelink: string, uploadTime: any, hashCode: string, iv: any) {
    await File.create({
        userId: userId,
        created: created,
        name: filename,
        downloads: downloads,
        link: filelink,
        uploadTime: uploadTime,
        hashCode: hashCode,
        iv: iv
    });
}