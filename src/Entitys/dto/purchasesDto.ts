import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Column} from "typeorm";


export class CreatePurchasesDto {

    @IsNotEmpty()
    warehouseId: number

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