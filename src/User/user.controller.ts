import {Body, Controller, Get, Post, Req, UseGuards} from "@nestjs/common";
import {UserService} from "./user.service";
import {UserDto} from "../dto/userDto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../Entity/user.entity";
import {JwtAuthGuard} from "../Auth/guards/jwt_auth.guard";
import {AuthGuard} from "@nestjs/passport";
import {Request} from "express";

@ApiTags('Users')
@Controller('users')
export class UserController{
    constructor(private userService: UserService ) {
    }

    @ApiOperation({summary: 'Создать пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post()
    createUser(@Body() dto: UserDto){
        console.log(dto)
        return this.userService.createUser(dto)
    }
    @ApiOperation({summary: 'Полочить всех пользователей '})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(JwtAuthGuard)
    @Get('all')
    getUsers(){
        return this.userService.getUsers()
    }
    @Post('one')
    findUserByEmail(@Body() email: string){
        return this.userService.findUserByEmail(email)
    }
}