import {forwardRef, Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoleModule} from "./Roles/role.module";
import {AuthModule} from "../Auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import {Role, User} from "../Entitys";
import {AccountsModule} from "../Accounts/Accounts.module";

@Module({
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
    imports: [TypeOrmModule.forFeature([User, Role]),
        RoleModule,
        forwardRef(() => AuthModule),
        forwardRef(() => AccountsModule),
        JwtModule]
})

export class UserModule {
}