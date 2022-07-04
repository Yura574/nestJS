import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {UserModule} from "../User/user.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {AuthController} from "./auth.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../Entity/user.entity";


@Module({
    providers: [AuthService, LocalStrategy],
    controllers:[AuthController],
    // exports: [AuthService]
    imports:[TypeOrmModule.forFeature([UserEntity]),UserModule, PassportModule]
})
export class AuthModule{}