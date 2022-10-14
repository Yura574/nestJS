
import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthService} from "./auth.service";
import {UserModule} from "../User/user.module";
import {PassportModule} from "@nestjs/passport";
import {AuthController} from "./auth.controller";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy, RefreshStrategy} from "./guards/strategy";
import {User} from "../Entitys";

@Module({
    providers: [AuthService, JwtStrategy, RefreshStrategy],
    controllers: [AuthController],
    exports: [AuthService],
    imports: [TypeOrmModule.forFeature([User]),
        forwardRef(()=>UserModule),
        PassportModule,
        JwtModule.register({

        }),]
})
export class AuthModule {
}