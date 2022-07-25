import {
    BaseEntity,
    Column,
    Entity,
    ManyToMany, OneToOne, PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "./user.entity";


@Entity()

export class Role extends BaseEntity{
    @ApiProperty({example: 'ec720174-115a-4a99-9b33-1f346c386198', description: 'id роли'})
    @Column()
    id: number

    @ApiProperty({example: 'user', description: 'роль пользователя'})
    @PrimaryColumn({unique: true})
    value: string

    // @OneToOne(()=> User,(user)=> user.role )
    // users: User
}