import {Column, DataType, Model, Table} from "sequelize-typescript";

interface UserInterface {
    firstName: string
    lastName: string
    email: string
    password: string
}

@Table({tableName: 'Users'})
export class User extends Model<User, UserInterface> {
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    firstName: string

    @Column({type: DataType.STRING, allowNull: false})
    lastName: string

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    email: string

    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean

    @Column({type: DataType.STRING, allowNull: true})
    banReason: string
}