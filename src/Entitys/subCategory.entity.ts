import {Column, Entity, ManyToOne, OneToMany,  PrimaryGeneratedColumn} from "typeorm";
import {Goods} from "./goods.entity";
import {Category} from "./category.entity";


@Entity()
export class SubCategory{

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    title: string

    @Column({nullable: true})
    image: string

    @ManyToOne(()=> Category, (category)=> category.subCategories, {onDelete: "CASCADE"})
    category: Category

    @OneToMany(()=> Goods, (goods)=> goods.subCategory)
    goods: Goods[]
}