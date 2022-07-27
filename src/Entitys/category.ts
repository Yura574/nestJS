import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {SubCategory} from "./subCategory";


@Entity()

export class Category {

    @PrimaryColumn({unique: true})
    title: string

   @Column({generated: "increment"})
    id: number

    @Column({nullable: true})
    image: string

    @ManyToOne(()=> User, (user)=> user.categories)
    user: User

    @OneToMany(()=> SubCategory, (subCategories) => subCategories.category)
    subCategories: SubCategory[]
}