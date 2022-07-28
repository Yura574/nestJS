import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {SubCategory} from "./subCategory";


@Entity()

export class Goods{


    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    image: string

    @Column()
    subCategoryTitle: string


    @ManyToOne(()=> SubCategory, (subCategory)=>subCategory.goods )
    subCategory: SubCategory
}