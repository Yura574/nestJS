import {Body, Controller, ForbiddenException, Get, Post, Req, Res,} from "@nestjs/common";
import {UserDto} from "../Entitys/dto/userDto";
import {AuthService} from "./auth.service";
import {ApiTags} from "@nestjs/swagger";
import {raw, Request, Response} from "express";
import {UserService} from "../User/user.service";

@ApiTags('authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
                private userService: UserService) {
    }

    @Post('singUp')
    singUp(@Body() dto: UserDto) {
        console.log(dto)
        return this.authService.singUp(dto)
    }

    @Post('singIn')
    async singIn(@Body() dto: UserDto,
                 @Res() res: Response) {
        try {
            const userData = await this.authService.singIn(dto)
            const {access_token, refresh_token, user} = userData
            res.cookie('refresh', refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            // console.log(userData)

            delete user.refreshToken
            delete user.password
            return res.json(user)
        }
        catch (e) {
            throw new ForbiddenException('email or password incorrect')
        }
    }

    @Get('me')
   async authMe(@Req() req: Request,
           @Res() res: Response) {
        // console.log(req.cookies.refresh)
        const userData = await this.authService.authMe(req.cookies.refresh)
        const {access_token, refresh_token, user} = userData
        res.cookie('refresh', refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        if (!user) {
            throw new ForbiddenException({message: 'not authorization'})
        }
        delete user.password
        delete user.refreshToken
        return res.json(user)
    }


    @Get('logout')
    logout(@Req() req: Request,
           @Res() res: Response) {
       const user = this.authService.logout(req.cookies.refresh)
        // console.log(user)
        res.clearCookie('refresh')
        return res.json(user)
    }

    @Post('refresh')
    refreshTokens() {
        return this.authService.refreshToken()
    }

    @Post('me')
    me(@Req() req: Request) {

        const token = req.cookies.refresh
        console.log(token)

        return this.authService.authMe(token)
    }

}

export type Tokens = {
    access_token: string,
    refresh_token: string
}