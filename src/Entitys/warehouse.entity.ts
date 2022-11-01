import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {Purchases} from "./Purchases.entity";


@Entity()

export class Warehouse {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({nullable: true})
    image: string

    @ManyToOne(() => User, (user) => user.warehouses)
    @JoinColumn()
    user: User

    @OneToMany(()=> Purchases, (purchases)=>purchases.warehouse )

    purchases: Purchases[]

}