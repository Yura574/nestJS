import {Body, Controller, ForbiddenException, Get, Post, Req, Res,} from "@nestjs/common";
import {UserDto} from "../Entitys/dto/userDto";
import {AuthService} from "./auth.service";
import {ApiTags} from "@nestjs/swagger";
import {Request, Response} from "express";
import {UserDtoRegistration} from "../Entitys/dto/userDtoRegistration";

@ApiTags('authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('singUp')
    async singUp(@Body() dto: UserDtoRegistration,
                 @Res() res: Response) {
        const userData = await this.authService.singUp(dto)
        const {user, refresh_token} = userData
        res.cookie('refresh', refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        delete user.password
        delete user.refreshToken
        return res.json(user)
    }

    @Post('singIn')
    async singIn(@Body() dto: UserDto,
                 @Res() res: Response) {
        try {
            const userData = await this.authService.singIn(dto)
            const {refresh_token, user} = userData
            res.cookie('refresh', refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            delete user.refreshToken
            delete user.password
            return res.json(user)
        } catch (e) {
            throw new ForbiddenException('email or password incorrect')
        }
    }

    @Get('me')
    async authMe(@Req() req: Request,
                 @Res() res: Response) {
        // console.log(req.cookies.refresh)
        const userData = await this.authService.authMe(req.cookies.refresh)
        const { refresh_token, user} = userData
        res.cookie('refresh', refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        if (!user) {
            throw new ForbiddenException({message: 'not authorization'})
        }
        delete user.password
        delete user.refreshToken
        return res.json(user)
    }


    @Get('logout')
    async logout(@Req() req: Request,
           @Res() res: Response) {
        // console.log(req.cookies)
        // const user = await this.authService.logout(req.cookies.refresh)
        // console.log('promis',user)
        res.clearCookie('refresh')
        return res.json()
    }

    @Post('refresh')
    refreshTokens() {
        return this.authService.refreshToken()
    }

    @Post('me')
    me(@Req() req: Request) {

        const token = req.cookies.refresh

        return this.authService.authMe(token)
    }

}

export type Tokens = {
    access_token: string,
    refresh_token: string
}