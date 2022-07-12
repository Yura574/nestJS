import {Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";


@Entity()

export class BasketDevice{

    @ApiProperty({example: 1, description: 'id'})
    @PrimaryGeneratedColumn()
    id: number
}