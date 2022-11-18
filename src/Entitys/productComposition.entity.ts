import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Products} from "./products.entity";


@Entity()

export class ProductComposition {
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

    @ManyToOne(()=> Products, (product)=> product.productComposition)
    product: Products

}