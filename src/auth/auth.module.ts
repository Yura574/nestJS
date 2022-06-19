import {forwardRef, Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";


@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        forwardRef(() =>UserModule),
        JwtModule.register({
            secret: process.env.PRIVAT_KEY || 'secret',
            signOptions: {
                expiresIn: '24h'
            }
        })
    ],
    exports: [
        AuthService,
        JwtModule
    ]

})

export class AuthModule {
}