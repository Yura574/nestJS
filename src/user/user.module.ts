import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";


@Module({
    providers:[UserService],
    controllers:[UserController],
    imports: [SequelizeModule.forFeature([User])]
})
export class UserModule {}