import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Schema} from "inspector";


@Entity()
export class TokenEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    user: any
}