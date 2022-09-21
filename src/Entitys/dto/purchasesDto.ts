import {IsNotEmpty} from "class-validator";


export class CreatePurchasesDto {

    @IsNotEmpty()
    warehouseId: number

    @IsNotEmpty()
    title: string

}