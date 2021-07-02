import { User, userTable } from '../../database/tables/user';
import { File, fileTable } from '../../database/tables/file';

export async function findUser(id: string) {
    return await User.findOne({
        where: { id: id }
    })
}

export async function findFile(id: string) {
    return await File.findOne({
        where: { id: id }
    })
}