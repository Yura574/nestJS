import {IsArray, IsNotEmpty, IsString} from "class-validator";


export class ProductCompositionDto {

    @IsNotEmpty()
    @IsString()
    productId: number
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