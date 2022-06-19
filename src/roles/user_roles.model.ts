import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Role} from "./role.model";
import {User} from "../user/user.model";


@Table({tableName: 'User_roles', createdAt: false, updatedAt: false})

export class UserRoles extends Model{


    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number
}