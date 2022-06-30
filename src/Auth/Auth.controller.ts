import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./Auth.service";
import {AuthDto} from "./dto";
import *  as argon from 'argon2'

@Controller('auth')


export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post()
   async register(@Body() authDto: AuthDto) {
        console.log(authDto)

        return this.authService.register(authDto)
    }

    @Post('login')
    login() {
        return this.authService.login()
    }
}