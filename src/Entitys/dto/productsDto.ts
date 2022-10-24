import {IsArray, IsNotEmpty, IsString} from "class-validator";
import {Composition} from "./productCompositionDto";


export class ProductsDto {

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    subCategoryId: string

   @IsArray()
    productComposition: Composition[]
}