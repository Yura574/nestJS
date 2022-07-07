import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

export enum UserRole{
    user=0,
    admin =1
}



@Entity()

export class UserEntity {
    @ApiProperty({example: 'ec720174-115a-4a99-9b33-1f346c386198', description:'id пользователя'})
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({example: 'lololo@gmail.com', description:'email пользователя'})
    @Column({unique: true})
    email: string

    @ApiProperty({example: 'lololo123', description:'пароль пользователя'})
    @Column()
    password: string

    @ApiProperty({example: 'true', description:'находится ли пользователь в сети'})
    @Column({default: false})
    isActivated?: boolean

    @ApiProperty({example: '0', description:'0 - user, 1 - admin'})
    @Column({type: "enum", enum: UserRole, default: UserRole.admin})
    role: UserRole

    @ApiProperty({example: 'ec720174-115a-4a99-9b33-1f346c386198', description:'ссылка для подверждения email'})
    @Column({default: null})
    activationLink: string

    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3O', description:'refresh token'})
    @Column({nullable: true})
    refreshToken: string

    @ApiProperty({example: '2022-07-07 18:33:09.169715', description:'дата создания'})
    @CreateDateColumn({type: "timestamptz", default: ()=> 'CURRENT_TIMESTAMP'})
    created: Date

    @ApiProperty({example: '2022-07-07 18:33:09.169715', description:'дата обновления'})
    @UpdateDateColumn({type: 'timestamptz', default: ()=> 'CURRENT_TIMESTAMP'})
    updated: Date
}