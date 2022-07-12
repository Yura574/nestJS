import {Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";


@Entity()

export class Basket {
    @ApiProperty({example: 1, description: 'id корзины'})
    @PrimaryGeneratedColumn()
    id: number

    
}