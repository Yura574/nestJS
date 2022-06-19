import {forwardRef, Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {Role} from "../roles/role.model";
import {UserRoles} from "../roles/user_roles.model";
import {RoleModule} from "../roles/role.module";
import {AuthModule} from "../auth/auth.module";


@Module({
    controllers: [UserController],
    providers: [UserService,],
    imports: [SequelizeModule.forFeature([User, Role, UserRoles]),
        RoleModule,
        forwardRef(() =>AuthModule)
    ],
    exports: [
        UserService,
        ]
})
export class UserModule {
}