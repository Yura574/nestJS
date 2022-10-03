import {BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Purchases} from "./Purchases.entity";


@Entity()

export class PurchasesInfo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    place: string

    @Column()
    price: string

    @Column()
    amount: string

    @Column()
    unit: string

    @Column()
    warehouse: string

    @Column()
    date: string

    @ManyToOne(()=>Purchases, (purchases)=> purchases.purchaseInfo)
    @JoinColumn()
    purchases: Purchases


}