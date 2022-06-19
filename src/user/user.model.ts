import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/role.model";
import {UserRoles} from "../roles/user_roles.model";

interface UserInterface {
    firstName: string
    lastName: string
    email: string
    password: string
}

@Table({tableName: 'Users'})
export class User extends Model<User, UserInterface> {
    @ApiProperty({example: 1, description: 'user id'})
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
    id: number

    @ApiProperty({example: 'Bob', description: 'user first name'})
    @Column({type: DataType.STRING, allowNull: false})
    firstName: string

    @ApiProperty({example: 'Marly', description: 'user last name'})
    @Column({type: DataType.STRING, allowNull: false})
    lastName: string

    @ApiProperty({example: 'email@gmail.com', description: "user email"})
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    email: string

    @ApiProperty({example: 87654321, description: 'user password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @ApiProperty({example: true, description: 'ban user'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean

    @ApiProperty({example: 'bad behavior', description: 'ban reason'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]
}