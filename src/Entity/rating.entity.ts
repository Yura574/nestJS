import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";


@Entity()

export class Rating {

    @ApiProperty({example: 1, description:'id'})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: 3, description:'рейниг товара'})
    @Column({default: 0})
    rating: number
}