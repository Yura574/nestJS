import {IsNotEmpty, IsString} from "class-validator";


export class GoodsDto{

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    subCategoryTitle: string
}