import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    JoinTable,
    ManyToMany, OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "./role.entity";
import {Post} from "./post.entity";
import {Basket} from "./basket.entity";
import {Rating} from "./rating.entity";


@Entity()

export class User {
    @ApiProperty({example: 1, description: 'id пользователя'})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: 'lololo@gmail.com', description: 'email пользователя'})
    @Column({unique: true})
    email: string

    @ApiProperty({example: 'lololo123', description: 'пароль пользователя'})
    @Column()
    password: string

    @ApiProperty({example: 'true', description: 'находится ли пользователь в сети'})
    @Column({default: false})
    isActivated?: boolean

    @ApiProperty({example: 'ec720174-115a-4a99-9b33-1f346c386198', description: 'ссылка для подверждения email'})
    @Column({default: null})
    activationLink: string

    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3O', description: 'refresh token'})
    @Column({nullable: true})
    refreshToken: string

    @ApiProperty({example: '2022-07-07 18:33:09.169715', description: 'дата создания'})
    @CreateDateColumn({type: "timestamptz", default: () => 'CURRENT_TIMESTAMP'})
    created: Date

    @ApiProperty({example: '2022-07-07 18:33:09.169715', description: 'дата обновления'})
    @UpdateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    updated: Date


//     @ManyToMany(() => Role, (role) => role.users)
//     @JoinTable({name:'user-role'})
//     role: Role[]
//
//     @OneToMany(()=> Post, (post)=> post.user)
//     posts: Post[]
//
//     @OneToOne(()=> Basket)
//     @JoinColumn()
//     basket: Basket
//
//     @OneToMany(()=> Rating, (rating)=> rating.user)
//     rating: Rating[]
}