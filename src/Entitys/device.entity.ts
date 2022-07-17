import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {BasketDevice} from "./basketDevice.entity";
import {DeviceInfo} from "./device_info";
import {Rating} from "./rating.entity";
import {Type} from "./type.entity";
import {Brand} from "./brand.entity";


@Entity()

export class Device {

    @ApiProperty({example: 1, description: 'id товара'})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: 'модель', description: 'название модели '})
    @Column()
    name: string

    @ApiProperty({example: '50$', description: 'цена товара'})
    @Column()
    price: string

    @ApiProperty({example: 4, description: 'рейтинг товара '})
    @Column()
    rate: string

    @ApiProperty({example: 'путь картинки', description: 'изображение товара'})
    @Column()
    img: string

    @OneToMany(() => DeviceInfo, (deviceInfo) => deviceInfo.device)
    @JoinColumn()
    deviceInfo: DeviceInfo

    @OneToMany(() => Rating, (rating) => rating.device)
    rating: Rating

    @OneToOne(() => BasketDevice, (basketDevice) => basketDevice.device)
    basketDevice: BasketDevice

    @ManyToOne(()=> Type, (type)=> type.device)
    typeId: Type

    @ManyToOne(()=> Brand, (brand)=> brand.device)
    brandId: Brand

}

