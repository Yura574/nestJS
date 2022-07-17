import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Device} from "./device.entity";
import {Type} from "./type.entity";


@Entity()

export class Brand {

    @ApiProperty({example: 1, description: 'id бренда'})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: 'Coplasca', description: 'бренд товара'})
    @Column({unique: true})
    name: string

    @OneToMany(() => Device, device => device.brandId)
    device: Device[]

    @ManyToMany(()=> Type, (type)=> type.brandId)
    @JoinTable({name:'brand_type'})
    typeId: Type[]

}
