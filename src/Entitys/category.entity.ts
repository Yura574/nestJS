import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {SubCategory} from "./subCategory.entity";


@Entity()

export class Category {

    @Column({unique: true})
    title: string

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    image: string

    @ManyToOne(() => User, (user) => user.categories, {onDelete: "CASCADE"})
    @JoinColumn()
    user: User

    @OneToMany(() => SubCategory, (subCategories) => subCategories.category)
    subCategories: SubCategory[]
}