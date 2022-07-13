import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Device} from "./device.entity";
import {Brand} from "./brand.entity";


@Entity()

export class Type {

    @ApiProperty({example: 1, description: 'id типа товара'})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: 'Кашпо', description: 'название типа изделия'})
    @Column({unique: true})
    name: string


    @OneToMany(()=> Device, (device)=> device.type)
    device: Device[]


    @ManyToMany(()=> Brand, (brand)=> brand.type)
    brand: Brand[]

}