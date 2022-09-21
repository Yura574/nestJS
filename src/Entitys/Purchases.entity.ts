import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Warehouse} from "./warehouse.entity";


@Entity()
export class Purchases {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({nullable: true})
    image: string

    @ManyToOne(()=> Warehouse, (warehouse)=> warehouse.purchases)
    @JoinColumn()
    warehouse: Warehouse
}