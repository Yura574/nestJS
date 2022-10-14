import {IsArray, IsNotEmpty, IsString} from "class-validator";


export class ProductCompositionDto {

    @IsNotEmpty()
    @IsString()
    productId: string
    @IsArray()
    composition: Composition[]
}

export class Composition {


    @IsString()
    purchaseTitle: string

    @IsString()
    amount: string

    @IsString()
    unit: string

    @IsString()
    price: string
}