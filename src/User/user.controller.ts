import {Body, Controller, Post} from "@nestjs/common";
import {UserService} from "./user.service";
import {UserDto} from "./dto/userDto";


@Controller('users')
export class UserController{
    constructor(private userService: UserService ) {
    }

    @Post()
    createUser(@Body() dto: UserDto){
        return this.userService.createUser(dto)
    }
}