import {IsNotEmpty, IsString} from "class-validator";


export class PurchaseInfoDto{

    @IsNotEmpty()
    purchaseId: number

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
    warehouse: string

    @IsString()
    date: string

}