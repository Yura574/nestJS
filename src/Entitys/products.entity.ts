import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {SubCategory} from "./subCategory.entity";
import {ProductComposition} from "./productComposition.entity";
import {User} from "./user.entity";


@Entity()

export class Products {


    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    title: string

    @Column({type: "real"})
    primeCost: string

    @Column()
    count: number

    @Column({nullable: true})
    image: string


    @ManyToOne(() => User, (user) => user.products)
    @JoinColumn()
    user: User

    @ManyToOne(() => SubCategory, (subCategory) => subCategory.products, {onDelete: "CASCADE"})
    @JoinColumn()
    subCategory: SubCategory

    @OneToMany(() => ProductComposition, (productComposition) => productComposition.product)
    productComposition: ProductComposition[]


}