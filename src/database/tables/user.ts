import { DataTypes, Model } from "sequelize";

export class User extends Model {
  public id!: string;
  public nickname!: string;
  public password!: string;
}

export const userTable = {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    nickname: {
        type:  DataTypes.STRING,
        allowNull: false
    },
    password: {
        type:  DataTypes.STRING,
        allowNull: false
    }
  }