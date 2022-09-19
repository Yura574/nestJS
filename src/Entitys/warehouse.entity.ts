import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";


@Entity()

export class Warehouse {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({nullable: true})
    image: string

    @ManyToOne(() => User, (user) => user.warehouses)
    @JoinColumn()
    user: User

}