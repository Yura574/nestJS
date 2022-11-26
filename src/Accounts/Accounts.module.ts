import {AccountsService} from "./Accounts.service";
import {AccountsController} from "./Accounts.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Accounts} from "../Entitys/Accounts.entity";
import {forwardRef, Module} from "@nestjs/common";
import {UserModule} from "../User/user.module";


@Module({
    providers:[AccountsService],
    controllers:[AccountsController],
    exports:[AccountsService],
    imports:[TypeOrmModule.forFeature([Accounts]),
        forwardRef(()=>UserModule)
    ]
})

export class AccountsModule {}