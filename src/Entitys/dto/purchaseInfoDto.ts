import {IsNotEmpty, IsString} from "class-validator";


export class purchaseInfoDto{

    @IsNotEmpty()
    userId: number

    @IsNotEmpty()
    title: string

    @IsString()
    price: string

    @IsString()
    place: string

    @IsString()
    amount: string

    @IsString()
    unit: string


    @IsString()
    date: string

}