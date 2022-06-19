import {Module} from "@nestjs/common";
import {RoleController} from "./role.controller";
import {RoleService} from "./role.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./role.model";
import {User} from "../user/user.model";
import {UserRoles} from "./user_roles.model";


@Module({
    controllers:[RoleController],
    providers: [RoleService],
    imports:[SequelizeModule.forFeature([Role, User, UserRoles])],
    exports: [RoleService]
})
export class RoleModule{}