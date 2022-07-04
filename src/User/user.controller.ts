import {Body, Controller, Get, Post} from "@nestjs/common";
import {UserService} from "./user.service";
import {UserDto} from "../dto/userDto";


@Controller('users')
export class UserController{
    constructor(private userService: UserService ) {
    }

    @Post()
    createUser(@Body() dto: UserDto){
        console.log(dto)
        return this.userService.createUser(dto)
    }
    @Get('all')
    getUsers(){
        return this.userService.getUser()
    }
    @Post('one')
    findOneUser(@Body() email: string){
        return this.userService.findOne(email)
    }
}