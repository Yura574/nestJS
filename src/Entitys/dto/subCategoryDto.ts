import {IsNotEmpty, IsString} from "class-validator";


export class SubCategoryDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    categoryTitle: string


}