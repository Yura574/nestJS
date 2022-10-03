import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Warehouse} from "./warehouse.entity";
import {PurchasesInfo} from "./PurchasesInfo.entity";


@Entity()
export class Purchases {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({nullable: true})
    price: string

    @Column({nullable: true})
    place: string

    @Column({nullable: true})
    amount: string

    @Column({nullable: true})
    unit: string

    @Column({nullable: true})
    date: string


    @Column({nullable: true})
    image: string

    @ManyToOne(()=> Warehouse, (warehouse)=> warehouse.purchases)
    @JoinColumn()
    warehouse: Warehouse

    @OneToMany(()=> PurchasesInfo, (purchaseInfo)=> purchaseInfo.purchases)
    purchaseInfo: PurchasesInfo[]
}