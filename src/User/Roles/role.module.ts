import {Module} from "@nestjs/common";
import {RoleService} from "./role.service";
import {RoleController} from "./role.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role, User} from "../../Entitys";


@Module({
    providers: [RoleService],
    controllers:[RoleController],
    imports:[ TypeOrmModule.forFeature([Role, User])],
    exports:[RoleService]
})

export class RoleModule{}