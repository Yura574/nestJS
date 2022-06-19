import {Body, Controller, Get, Post} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create_user.dto";


@Controller('/users')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @Get()
    getAllUsers(){
        return this.userService.findAll()
    }
}