import {Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "./category";


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
}