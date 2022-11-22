import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {Investment} from "./investment.entity";
import {LedgerComposition} from "./ledgerComposition.entity";
import {Duty} from "./duty.entity";


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

    @Column({nullable: true, type: "real", default: '0'})
    price: string

    @Column({nullable: true,type:"real", default: '0'})
    primeCost: string

    @Column({nullable: true,type: "real", default: '0'})
    profit: string



    @Column({nullable: true})
    data: string

    @ManyToOne(()=> User, (user)=> user.ledger)
    @JoinColumn()
    user: User

    @OneToMany(()=> Investment, (investment)=> investment.ledger)
    investment: Investment[]

    @OneToMany(()=> Duty, (duty)=> duty.ledger)
    duty: Duty[]

    @OneToMany(() => LedgerComposition, (ledgerComposition) => ledgerComposition.ledger)
    ledgerComposition: LedgerComposition[]
}