import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Products} from "./products.entity";


@Entity()

export class ProductComposition {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    purchaseTitle: string

    @Column()
    amount: string

    @Column()
    unit: string

    @Column()
    price: string

    @ManyToOne(()=> Products, (product)=> product.productComposition)
    product: Products

}