import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "../user.entity";


// @Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date



    // @ManyToOne(()=> User, (user)=> user.posts)
    // user: User
}