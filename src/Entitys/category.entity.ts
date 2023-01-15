import {Column, Entity, JoinColumn, ManyToOne, OneToMany,  PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {SubCategory} from "./subCategory.entity";


@Entity()

export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({nullable: true})
    image: string

    @ManyToOne(() => User, (user) => user.categories)
    @JoinColumn()
    user: User

    @OneToMany(() => SubCategory, (subCategories) => subCategories.category)
    subCategories: SubCategory[]
}