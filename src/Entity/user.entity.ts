import {Column, Entity,  PrimaryGeneratedColumn} from "typeorm";


@Entity()

export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column({default: false})
    isActivated: boolean

    @Column({default: null})
    activationLink: string

    @Column({nullable: true})
    refreshToken: string
}