import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";


@Entity()

export class Device {

    @ApiProperty({example: 1, description: 'id товара'})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: 'модель', description: 'название модели '})
    @Column({unique: true})
    name: string

    @ApiProperty({example:'50$', description: 'цена товара'})
    @Column()
    price: string

    @ApiProperty({example: 3.8, description: 'рейтинг товара '})
    @Column()
    rating: number

    @ApiProperty({example: 'путь картинки', description: 'изображение товара'})
    @Column()
    img: string
}