import {Body, Controller, Get, Post, Req, Request, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {UserDto} from "../dto/userDto";
import {AuthService} from "./auth.service";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req) {
        return req.user
    }

    @Post('singUp')
    singUp(@Body() dto: UserDto) {
        console.log({dto})
        return this.authService.singUp(dto)
    }

    @Post('singIn')
    singIn(@Body() dto: UserDto) {
        return this.authService.singIn(dto)
    }
}