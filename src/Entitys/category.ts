import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";


@Entity()

export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @PrimaryColumn()
    @Column({unique: true})
    title: string

    @Column({nullable: true})
    image: string
}