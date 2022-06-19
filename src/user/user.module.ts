import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {Role} from "../roles/role.model";
import {UserRoles} from "../roles/user_roles.model";
import {RoleModule} from "../roles/role.module";


@Module({
    controllers: [UserController],
    providers: [UserService,],
    imports: [SequelizeModule.forFeature([User, Role, UserRoles]),
        RoleModule
    ],
    exports: [UserService]
})
export class UserModule {
}