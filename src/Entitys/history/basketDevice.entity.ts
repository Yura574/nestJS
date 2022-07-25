import {Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Basket} from "./basket.entity";
import {Device} from "./device.entity";


// @Entity()

export class BasketDevice{

    @ApiProperty({example: 1, description: 'id'})
    @PrimaryGeneratedColumn()
    id: number

    // @ManyToOne(()=>Basket, (basket)=> basket.basketDevice)
    // basket: Basket
    //
    // @OneToOne(()=>Device, (device)=> device.basketDevice)
    // device: Device


}