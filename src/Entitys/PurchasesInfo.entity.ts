import { Column, Entity, JoinColumn, ManyToOne,  PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";


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

    @Column({nullable: true})
    unitPrice: string

    @Column()
    date: string

    // @ManyToOne(()=>Purchases, (purchases)=> purchases.purchaseInfo)
    // @JoinColumn()
    // purchases: Purchases

    @ManyToOne(()=> User, (user)=> user.purchasesInfo)
    @JoinColumn()
    user: User


}