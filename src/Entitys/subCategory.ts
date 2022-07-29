import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {Category} from "./category";
import {Goods} from "./goods.entity";


@Entity()
export class SubCategory{

    @PrimaryColumn({unique: true})
    title: string

    @Column({generated: "increment"})
    id: number

      @Column({nullable: true})
    image: string

    @ManyToOne(()=> Category, (category)=> category.subCategories)
    category: Category

    @OneToMany(()=> Goods, (goods)=> goods.subCategory)
    goods: Goods[]
}