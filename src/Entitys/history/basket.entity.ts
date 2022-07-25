import {Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../user.entity";
import { BasketDevice } from "./basketDevice.entity";


// @Entity()

export class Basket {
    @ApiProperty({example: 1, description: 'id корзины'})
    @PrimaryGeneratedColumn()
    id: number

    // @OneToOne(()=> User, (user)=> user.basket)
    // user: User
    //
    // @OneToMany(()=>BasketDevice, (basketDevice)=>basketDevice )
    // basketDevice: BasketDevice[]


}