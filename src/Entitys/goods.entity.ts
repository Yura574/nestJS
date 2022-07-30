import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {SubCategory} from "./subCategory.entity";


@Entity()

export class Goods{


    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    title: string

    @Column({nullable:true})
    image: string




    @ManyToOne(()=> SubCategory, (subCategory)=>subCategory.goods )
    subCategory: SubCategory
}