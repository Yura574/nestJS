import {AccountsService} from "./Accounts.service";
import {AccountsController} from "./Accounts.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Accounts} from "../Entitys/Accounts.entity";
import {Module} from "@nestjs/common";


@Module({
    providers:[AccountsService],
    controllers:[AccountsController],
    exports:[AccountsService],
    imports:[TypeOrmModule.forFeature([Accounts])]
})

export class AccountsModule {}