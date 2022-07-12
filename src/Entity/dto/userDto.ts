import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class UserDto{
    @ApiProperty({example: 'lololo@gmail.com', description:'email пользователя'})
    @IsNotEmpty()
    @IsEmail()
     email: string
    @ApiProperty({example: 'lololo123', description:'пароль пользователя'})
    @IsString()
    @IsNotEmpty()
     password: string

}


