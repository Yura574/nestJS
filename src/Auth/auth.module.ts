import {forwardRef, Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {UserModule} from "../User/user.module";
import {PassportModule} from "@nestjs/passport";
import {AuthController} from "./auth.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy, RefreshStrategy} from "./guards/strategy";
import {User} from "../Entitys";
import {SubCategoryModule} from "../SubCategory/subCategory.module";

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