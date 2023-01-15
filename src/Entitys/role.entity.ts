import {
    BaseEntity,
    Column,
    Entity,
    OneToMany, PrimaryGeneratedColumn,
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "./user.entity";


@Entity()

export class Role extends BaseEntity {
    @ApiProperty({example: '1', description: 'id роли'})
    @PrimaryGeneratedColumn()
    id: number


    @ApiProperty({example: 'user', description: 'роль пользователя'})
    @Column({unique: true})
    value: string

    @OneToMany(() => User, (user) => user.role)
    user: User[]
}