import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Products} from "./products.entity";
import {Ledger} from "./ledger.entity";


@Entity()
export class LedgerComposition {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    purchaseTitle: string

    @Column({type:"real", nullable: true})
    amount: string

    @Column()
    unit: string

    @Column({type:"real", nullable: true})
    price: string

    @ManyToOne(()=> Ledger, (ledger)=> ledger.ledgerComposition)
    @JoinColumn()
    ledger: Ledger
}