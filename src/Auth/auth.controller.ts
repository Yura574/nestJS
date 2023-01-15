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
        res.cookie('refresh', refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: "none"})
        delete user.password
        delete user.refreshToken
        console.log(user)
        return res.json(user)
    }

    @Post('singIn')
    async singIn(@Body() dto: UserDto,
                 @Res() res: Response) {

        try {
            const userData = await this.authService.singIn(dto)
            const {refresh_token, user} = userData
            res.cookie('refresh', refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: "none"})
            delete user.refreshToken
            delete user.password
            console.log(user)
            console.log(refresh_token)
            return res.json(user)
        } catch (e) {
            throw new ForbiddenException('email or password incorrect')
        }
    }

    @Get('me')
    async authMe(@Req() req: Request,
                 @Res() res: Response) {
        try{
            if(!req.cookies.refresh){
                return res.json(new ForbiddenException({message: 'not authorization'})
                )
            }
            const userData = await this.authService.authMe(req.cookies.refresh)

            const { refresh_token, user} = userData
            res.cookie('refresh', refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: "none"})
            if (!user) {
                console.log('not user')
                const error= new ForbiddenException({message: 'not authorization'})
                return {error}

            }
            delete user.password
            delete user.refreshToken
            return res.json(user)
        }
        catch (err){
            console.log(err)
        }

    }
    @Get('test')
   async test(@Req() req: Request,
              @Res() res: Response){
        return 'test'
    }



    @Get('logout')
    async logout(@Req() req: Request,
           @Res() res: Response) {

        // const user = await this.authService.logout(req.cookies.refresh)
        res.clearCookie('refresh')
        return res.json()
    }

    @Post('refresh')
    refreshTokens() {
        console.log(3)
        return this.authService.refreshToken()
    }

    @Post('me')
    me(@Req() req: Request) {
        console.log(2)
        const token = req.cookies.refresh

        return this.authService.authMe(token)
    }

}

export type Tokens = {
    access_token: string,
    refresh_token: string
}