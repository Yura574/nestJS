import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";


@Entity()

export class Type {

    @ApiProperty({example: 1, description: 'id типа товара'})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: 'Кашпо', description: 'название типа изделия'})
    @Column({unique: true})
    name: string

}