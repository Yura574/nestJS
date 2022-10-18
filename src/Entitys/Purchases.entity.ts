import {Column, Entity, JoinColumn,  ManyToOne,   PrimaryGeneratedColumn} from "typeorm";
import {Warehouse} from "./warehouse.entity";
import {User} from "./user.entity";


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
    unitPrice: string

    @Column({nullable: true})
    date: string


    @Column({nullable: true})
    image: string

    @ManyToOne(()=> Warehouse, (warehouse)=> warehouse.purchases)
    @JoinColumn()
    warehouse: Warehouse

    @ManyToOne(()=> User, (user)=> user.purchases)
    @JoinColumn()
    user: User


    // @OneToMany(()=> PurchasesInfo, (purchaseInfo)=> purchaseInfo.purchases)
    // purchaseInfo: PurchasesInfo[]
}