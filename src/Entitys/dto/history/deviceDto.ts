import {IsNotEmpty,  IsString} from "class-validator";


export class DeviceDto{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    price: string

    @IsString()
    rate: string
   // @IsString()
   //  img: string



}