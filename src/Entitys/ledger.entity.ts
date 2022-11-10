import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";


@Entity()
export class Ledger {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    operation: string

    @Column({nullable: true})
    count: number

    @Column({nullable: true, type: "real"})
    price: string

    @Column({nullable: true,type:"real"})
    primeCost: string

    @Column({nullable: true,type: "real"})
    profit: string


    @Column({nullable: true})
    data: string

    @ManyToOne(()=> User, (user)=> user.ledger)
    @JoinColumn()
    user: User
}