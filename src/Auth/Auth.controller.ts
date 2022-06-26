import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./Auth.service";

@Controller('auth')


export class AuthController{
constructor(private authService: AuthService) {
}
    @Post()
    register(@Body() dto: any){
        console.log(dto)
        return this.authService.register()
    }

    @Post('login')
    login(){
    return this.authService.login()
    }
}