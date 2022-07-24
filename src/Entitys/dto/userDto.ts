import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class UserDto{
    @ApiProperty({example: 'lololo@gmail.com', description:'email пользователя'})
    @IsNotEmpty()
    @IsEmail({},{message:'incorrect email'})
     email: string
    @ApiProperty({example: 'lololo123', description:'пароль пользователя'})
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
     password: string

}


