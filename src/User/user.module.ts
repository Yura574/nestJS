import {forwardRef, Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../Entitys/user.entity";
import {Role} from "../Entitys/role.entity";
import {RoleModule} from "./Roles/role.module";
import {AuthModule} from "../Auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import {Post} from "../Entitys/post.entity";

@Module({
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService,
    ],
    imports: [TypeOrmModule.forFeature([User, Role, Post]),
        RoleModule,
        forwardRef(() => AuthModule), JwtModule]
})

export class UserModule {
}