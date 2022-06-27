import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./Auth.service";
import {AuthDto} from "./dto";

@Controller('auth')


export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post()
    register(@Body() authDto: AuthDto) {
        console.log(authDto)
        return this.authService.register(authDto)
    }

    @Post('login')
    login() {
        return this.authService.login()
    }
}