import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../user/user.model";
import {UserRoles} from "./user_roles.model";


interface RoleInterface {
    value: string
    // description: string
}


@Table({tableName: 'Roles', createdAt: false, updatedAt: false})
export class Role extends Model<Role, RoleInterface> {

    @ApiProperty({example: 1, description: 'role id'})
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: string

    @ApiProperty({example: 'admin', description: 'user role'})
    @Column({type: DataType.STRING, unique: true})
    value: string

    // @ApiProperty({example: 'administrator', description: 'manager app'})
    // @Column({type: DataType.STRING})
    // description: string

    @BelongsToMany(()=> User, ()=> UserRoles)
    users: User[]
}