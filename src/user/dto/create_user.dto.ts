import {ApiProperty} from "@nestjs/swagger";


export class CreateUserDto{
    @ApiProperty({ example: 'Bob', description: 'user first name'})
    readonly firstName: string
    @ApiProperty({ example: 'Marly', description: 'user last name'})
    readonly lastName: string
    @ApiProperty({ example: 'email@gmail.com', description: "user email"})
    readonly email: string
    @ApiProperty({example: 87654321, description: 'user password'})
    readonly password: string
}