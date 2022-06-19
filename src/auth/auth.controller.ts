import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../user/dto/create_user.dto";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) {
    }

    @ApiOperation({})
    @Post('login')
    login(@Body() userDto: CreateUserDto){
        return this.authService.login(userDto)
    }

    @Post('registration')
    registration(@Body() userDto: CreateUserDto){
        return this.authService.registration(userDto)
    }
}