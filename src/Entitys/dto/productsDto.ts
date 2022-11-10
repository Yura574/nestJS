import {IsArray, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Composition} from "./productCompositionDto";


export class ProductsDto {

    @IsNotEmpty()
    userId: number

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    subCategoryId: string

   @IsArray()
    productComposition: Composition[]

    @IsString()
    primeCost: string

    @IsNumber()
    count: number
}

export class UpdateProductDto{
    @IsNotEmpty()
    @IsNumber()
    id: number

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    primeCost: string

    @IsNotEmpty()
    @IsNumber()
    count: number

    @IsString()
    image:string
}