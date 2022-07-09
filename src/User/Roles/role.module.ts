import {Module} from "@nestjs/common";
import {RoleService} from "./role.service";
import {RoleController} from "./role.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role} from "../../Entity/role.entity";
import {User} from "../../Entity/user.entity";


@Module({
    providers: [RoleService],
    controllers:[RoleController],
    imports:[ TypeOrmModule.forFeature([Role, User])],
    exports:[RoleService]
})

export class RoleModule{}