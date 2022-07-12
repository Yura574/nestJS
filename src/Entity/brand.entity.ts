import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";


@Entity()

export class Brand {

    @ApiProperty({example: 1, description: 'id бренда'})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: 'Coplasca', description: 'бренд товара'})
    @Column({unique: true})
    name: string


}
