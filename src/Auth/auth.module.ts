import {forwardRef, Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {UserModule} from "../User/user.module";
import {PassportModule} from "@nestjs/passport";
// import {LocalStrategy} from "./local.strategy";
import {AuthController} from "./auth.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./guards/strategy";
import {RefreshStrategy} from "./guards/strategy/refresh.strategy";
import {User} from "../Entity/user.entity";


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