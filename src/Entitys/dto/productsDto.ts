import {IsArray, IsNotEmpty, IsString} from "class-validator";
import {ProductCompositionDto} from "./productCompositionDto";


export class ProductsDto {

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    subCategoryId: string

   @IsArray()
    productComposition: ProductCompositionDto[]
}