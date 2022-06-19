import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create_user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./user.model";
import {RolesGuards} from "../auth/roles.guards";
import {Roles} from "../auth/roles_auth.decorator";

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {
    }

    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('admin')
    @UseGuards(RolesGuards)
    @Get()
    getAllUsers() {
        return this.userService.findAll()
    }
}