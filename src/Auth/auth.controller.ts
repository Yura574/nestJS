import {Body, Controller, Get, Post, Req, } from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {UserDto} from "../Entity/dto/userDto";
import {AuthService} from "./auth.service";
import {ApiTags} from "@nestjs/swagger";
import {Request} from "express";

@ApiTags('authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    // @UseGuards(AuthGuard('local'))
    // @Post('login')
    // async login(@Req() req) {
    //     return req.user
    // }

    @Post('singUp')
    singUp(@Body() dto: UserDto): Promise<Tokens> {
        console.log({dto})
        return this.authService.singUp(dto)
    }

    @Post('singIn')
    singIn(@Body() dto: UserDto): Promise<Tokens> {
        return this.authService.singIn(dto)
    }

    @Post('logout')
    logout(@Req() req: Request){
        const user = req.user
        return this.authService.logout(4)
    }

    @Post('refresh')
    refreshTokens(){
        return this.authService.refreshToken()
    }

}
export type Tokens = {
    access_token: string,
    refresh_token: string
}