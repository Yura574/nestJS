import {IsNotEmpty, IsNumber, IsString} from "class-validator";


export class DeviceDto{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    price: string

    @IsNumber()
    rating: number

    @IsString()
    img: string
}