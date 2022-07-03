import {Column, Entity,  PrimaryGeneratedColumn} from "typeorm";
import {IsEmail, IsNotEmpty, Min} from "class-validator";


@Entity()

export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Column()
    @IsNotEmpty()
    @Min(8)
    password: string
}