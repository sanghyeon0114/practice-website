import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: 'mariadb',
    host: 'remote.goorm.me',
    port: 3306,
    username: 'user2',
    password: 'connplenow',
    database: 'db2'
});