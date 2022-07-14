import {IsNotEmpty, IsString} from "class-validator";


export class TypeDto{
    @IsString()
    @IsNotEmpty()
    name: string
}