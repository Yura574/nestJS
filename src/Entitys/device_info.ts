import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Device} from "./device.entity";


@Entity()

export class DeviceInfo{

    @ApiProperty({example: 1, description: 'id описания'})
    @PrimaryGeneratedColumn()
    id:number

    // @ApiProperty({example: 5, description: 'id товара, для которого описание'})
    // @Column()
    // deviceId: number

    @ApiProperty({example: 'Свечка', description: 'название товара, для которого описание'})
    @Column()
    title: string

    @ApiProperty({example: 'ароматическая свеча', description:'описание товара'})
    @Column()
    description: string

    // @OneToOne(()=>Device, (device)=> device.deviceInfo)
    //
    // device: Device
}