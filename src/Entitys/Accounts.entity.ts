import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";


@Entity()

export class Accounts{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({type:"real"})
    sum: string

    @ManyToOne(()=> User, (user)=> user.accounts)
    @JoinColumn()
    user: User
}