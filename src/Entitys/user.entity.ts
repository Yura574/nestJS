import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, ManyToOne,
    OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "./role.entity";
import {Category} from "./category.entity";


@Entity()

export class User {
    @ApiProperty({example: 1, description: 'id пользователя'})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: 'Yura', description: 'имя пользователя'})
    @Column({nullable: true})
    name: string


    @ApiProperty({example: 'lololo@gmail.com', description: 'email пользователя'})
    @Column({unique: true})
    email: string

    @ApiProperty({example: 'lololo123', description: 'пароль пользователя'})
    @Column()
    password: string


    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3O', description: 'refresh token'})
    @Column({nullable: true})
    refreshToken: string

    @ApiProperty({example: '2022-07-07 18:33:09.169715', description: 'дата создания'})
    @CreateDateColumn({type: "timestamptz", default: () => 'CURRENT_TIMESTAMP'})
    created: Date

    @ApiProperty({example: '2022-07-07 18:33:09.169715', description: 'дата обновления'})
    @UpdateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    updated: Date

    toResponse(){
        const {id,email,refreshToken,updated, created, role} = this
    }


    @ManyToOne(() => Role, (role)=> role.user)
    @JoinColumn()
    role: Role

    @OneToMany(() => Category, (category) => category.user)
    categories: Category[]



}