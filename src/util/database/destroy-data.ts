import { File } from '../../database/tables/file';
import { User } from '../../database/tables/user';

export async function removeUser (id: string) {
    User.destroy({
        where: {
            id: id
        }
    })
}

export async function removeFile (id: string) {
    File.destroy({
        where: {
            id: id
        }
    })
}