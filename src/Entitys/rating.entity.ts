import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "./user.entity";
import {Device} from "./device.entity";


@Entity()

export class Rating {

    @ApiProperty({example: 1, description:'id'})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: 3, description:'рейниг товара'})
    @Column({ default: 0})
    rate: string

    @ManyToOne(()=> User, (user)=> user.rating)
    user: User

    @ManyToOne(()=>Device, (device)=> device.rating)
    device: Device
}