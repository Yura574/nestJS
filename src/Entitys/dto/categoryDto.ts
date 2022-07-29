import {IsNotEmpty, IsNumber, IsString} from "class-validator";


export class CategoryDto{
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    userId: number


}