import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {Category} from "./category";
import {Goods} from "./goods.entity";


@Entity()
export class SubCategory{

    @Column({generated: "increment"})
    id: number

    @PrimaryColumn({unique: true})
    title: string

    @Column({nullable: true})
    image: string

    @ManyToOne(()=> Category, (category)=> category.subCategories)
    category: Category

    @OneToMany(()=> Goods, (goods)=> goods.subCategory)
    goods: Goods[]
}