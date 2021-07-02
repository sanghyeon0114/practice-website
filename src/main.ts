import express from 'express';
import cors from 'cors';
import { verifyMiddleWare } from './middleware/verify';
import mainRouter from './router/main-router';
import { sequelize } from './database/sequelize';
import { User, userTable } from './database/tables/user';
import { File, fileTable } from './database/tables/file';

import fs from 'fs';

async function main() {
    const app = express();
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    User.init(userTable, { sequelize })
    File.init(fileTable, { sequelize })

    await sequelize.sync()

    app.use(verifyMiddleWare);
    app.use('/', mainRouter);

    app.listen(3000, async () => {
        var dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        console.log('Example app listening in port 3000');
    });
}

main();