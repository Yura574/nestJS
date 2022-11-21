import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";


@Entity()

export class Accounts {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "real", default: 0})
    primeCost: string

    @Column({type: "real", default: 0})
    profit: string

    @Column({type: "real", default: 0})
    investment: string

    @Column({type: "real", default: 0})
    duty: string


    @ManyToOne(() => User, (user) => user.accounts)
    @JoinColumn()
    user: User
}