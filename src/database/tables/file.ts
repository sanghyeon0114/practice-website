import { DataTypes, Model } from "sequelize";
import { User } from "./user";


export class File extends Model {
    public id!:number;
    public userId!: string;
    public created!: Date;
    public name!: string;
    public downloads!: number;
    public link!: string;
    public uploadTime!: number;
    public hashCode!: string;
    public iv!: string;
    public User!: User;
  }
  
export const fileTable = {
    id: {
        type:  DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userId:{
        type:  DataTypes.STRING,
        allowNull: true
    },
    created: {
        type:  DataTypes.DATE,
        allowNull: false
    },
    name: {
        type:  DataTypes.STRING,
        allowNull: false
    },
    downloads: {
        type:  DataTypes.INTEGER,
        allowNull: false
    },
    link: {
        type:  DataTypes.STRING,
        allowNull: false
    },
    uploadTime: {
        type:  DataTypes.INTEGER,
        allowNull: true
    },
    hashCode:{
        type:  DataTypes.STRING,
        allowNull: true
    },
    iv: {
        type:  DataTypes.STRING,
        allowNull: true
    }
}