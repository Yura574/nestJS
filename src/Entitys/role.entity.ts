import {
    BaseEntity,
    Column,
    Entity,
     OneToMany,  PrimaryColumn,
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "./user.entity";


@Entity()

export class Role extends BaseEntity {
    @ApiProperty({example: 'user', description: 'роль пользователя'})
    @PrimaryColumn({unique: true})
    value: string

    @ApiProperty({example: 'ec720174-115a-4a99-9b33-1f346c386198', description: 'id роли'})
    @Column()
    id: number

    @OneToMany(() => User, (user) => user.role)
    user: User[]
}