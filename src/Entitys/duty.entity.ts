import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Ledger} from "./ledger.entity";

@Entity()

export class Duty {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({type: "real"})
    sum: string

    @ManyToOne(()=> Ledger, (ledger)=> ledger.duty)
    @JoinColumn()
    ledger: Ledger
}