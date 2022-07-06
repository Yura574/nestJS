import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Schema} from "inspector";


@Entity()
export class TokenEntity{

    @Column({})
    user: any
    @Column({})
    refreshToken: string
}