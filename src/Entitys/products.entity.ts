import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {SubCategory} from "./subCategory.entity";
import {ProductComposition} from "./productComposition.entity";


@Entity()

export class Products{


    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    title: string

    @Column({nullable:true})
    image: string






    @ManyToOne(()=> SubCategory, (subCategory)=>subCategory.products, {onDelete: "CASCADE"} )
    subCategory: SubCategory

    @OneToMany(()=>ProductComposition, (productComposition)=> productComposition.product)
    productComposition: ProductComposition[]


}