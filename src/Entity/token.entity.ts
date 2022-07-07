import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class TokenEntity {
    @PrimaryGeneratedColumn()
    id
    @Column()
    user: string
    @Column()
    refreshToken: string
}