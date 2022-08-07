import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class UserDtoRegistration{
    @ApiProperty({example: 'lololo@gmail.com', description:'email пользователя'})
    @IsNotEmpty({message: ' The user login cannot be empty'})
    @IsString({message: 'The user login must be a string'})
    @IsEmail({},{message:'incorrect email'})
     email: string
    @ApiProperty({example: 'lololo123', description:'пароль пользователя'})
    @IsNotEmpty({message: ' The user password cannot be empty'})
    @IsString({message: 'The user password must be a string'})
    @MinLength(8)
    password: string
    @ApiProperty({example: 'Yura', description:'имя пользователя'})
    @IsNotEmpty({message: ' The user name cannot be empty'})
    @IsString({message: 'The user name must be a string'})
    name: string

}


