import {Column, Entity, ManyToOne, OneToMany,  PrimaryGeneratedColumn} from "typeorm";
import {Category} from "./category.entity";
import {Products} from "./products.entity";


@Entity()
export class SubCategory{

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    title: string

    @Column({nullable: true})
    image: string

    @ManyToOne(()=> Category, (category)=> category.subCategories)
    category: Category

    @OneToMany(()=> Products, (products)=> products.subCategory)
    products: Products[]
}