import {IsEmail, IsNotEmpty, IsString, Min} from "class-validator";


export class UserDto{
    @IsNotEmpty()
    @IsEmail()
     email: string
    @IsString()
    @IsNotEmpty()
     password: string

}