import {Body, Controller, ForbiddenException, Get, Post, Req, Res,} from "@nestjs/common";
import {UserDto} from "../Entitys/dto/userDto";
import {AuthService} from "./auth.service";
import {ApiTags} from "@nestjs/swagger";
import {Request, Response} from "express";

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
   async singIn( @Body()dto: UserDto,
                 @Res() res: Response) {
        // console.log(dto)
        const userData = await this.authService.singIn(dto)
        // res.cookie('refresh', userData.refresh_token)
        // res.cookie('refresh', userData.refresh_token)
        // console.log(userData)
         res.cookie('refresh',userData.refresh_token, {maxAge: 30*24*60*60*1000, httpOnly: true})
        console.log(userData)
        return res.json(userData)
    }

    @Get('me')
    authMe(@Req() req: Request) {
        const id = req.query.id
        if (!id) {
            throw new ForbiddenException({message: 'not id'})
        }
        return req.query.id
    }


    @Post('logout')
    logout(@Req() req: Request) {
        return this.authService.logout(4)
    }

    @Post('refresh')
    refreshTokens() {
        return this.authService.refreshToken()
    }
    @Post('me')
    me(@Req() req: Request){
        console.log(req.cookies.refresh)
        const token = req.cookies.refresh
        console.log(token)
        return this.authService.authMe(token)
    }

}

export type Tokens = {
    access_token: string,
    refresh_token: string
}