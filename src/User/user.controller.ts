import {Body, Controller, Delete, Get, Param, Post, UseGuards} from "@nestjs/common";
import {UserService} from "./user.service";
import {UserDto} from "../Entitys/dto/userDto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../Entitys/user.entity";
import {RolesGuard} from "../Auth/guards/roles.guard";
import {Roles} from "../Auth/guards/roles-auth.decorator";

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
    // @UseGuards(RolesGuard)
    @Roles('admin')
    @Get('all')
    getUsers(){
        return this.userService.getUsers()
    }
    @Post('one')
    findUserByEmail(@Body() email: string){
        return this.userService.findUserByEmail(email)
    }
    @Delete('delete/:id')
    deleteUser (@Param() params){
        // return params.id
        return this.userService.deleteUser(Number(params.id))
    }
}