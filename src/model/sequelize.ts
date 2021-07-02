import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
    models: ['src/model'],
})
