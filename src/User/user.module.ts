import {Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../Entity/user.entity";
import {Role} from "../Entity/role.entity";
import {RoleModule} from "./Roles/role.module";

@Module({
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
    imports: [TypeOrmModule.forFeature([User, Role]),
    RoleModule]
})

export class UserModule {
}