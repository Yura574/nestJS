import {IsArray, IsNotEmpty, IsNumber, IsString} from "class-validator";


export class ProductCompositionDto {

    @IsNotEmpty()
    @IsNumber()
    productId: number

    @IsNumber()
    count: number

    @IsArray()
    composition: Composition[]
}

export class Composition {

    @IsString()
    warehouseId: string

    @IsString()
    purchaseTitle: string

    @IsString()
    amount: string

    @IsString()
    unit: string

    @IsString()
    price: string
}