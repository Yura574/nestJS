import {IsNotEmpty, Min} from "class-validator";


export class UserDto{
    @IsNotEmpty()
    readonly email: string
    @Min(8)
    readonly password: string
}