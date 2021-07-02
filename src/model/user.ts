import { Column, Model, Table } from "sequelize-typescript";

@Table
export class User extends Model {
    @Column
    id!: number;

    @Column
    password!: string;

    @Column
    fileId!: number;
}
