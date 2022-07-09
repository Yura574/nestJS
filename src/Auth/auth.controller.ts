import {Body, Controller, Get, Post, Req, Request, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {UserDto} from "../dto/userDto";
import {AuthService} from "./auth.service";
import {ApiTags} from "@nestjs/swagger";

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
    logout(){
        return this.authService.logout()
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