import {IsNotEmpty, IsString} from "class-validator";


export class CategoryUpdateDto{
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    id: string


}