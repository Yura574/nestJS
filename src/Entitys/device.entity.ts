import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {BasketDevice} from "./basketDevice.entity";
import {DeviceInfo} from "./device_info";


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

    // @OneToOne(()=>DeviceInfo, (deviceInfo)=> deviceInfo.device)
    // @JoinColumn()
    // deviceInfo: DeviceInfo

}

