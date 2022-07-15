import {Body, Controller, ForbiddenException, Get, Post, Req,} from "@nestjs/common";
import {UserDto} from "../Entitys/dto/userDto";
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

    @Get('me')
    authMe(@Req() req: Request){
        const id = req.query.id
        if(!id){
            throw new ForbiddenException({message: 'not id'})
        }
        return req.query.id
    }


    @Post('logout')
    logout(@Req() req: Request){
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