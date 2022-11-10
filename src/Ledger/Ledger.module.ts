import {Module} from "@nestjs/common";
import {LedgerController} from "./Ledger.controller";
import {LedgerService} from "./Ledger.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Ledger} from "../Entitys/ledger.entity";
import {UserModule} from "../User/user.module";
import {ProductModule} from "../Product/Product.module";


@Module({
    controllers: [LedgerController],
    providers:[LedgerService],
    imports: [TypeOrmModule.forFeature([Ledger]), UserModule, ProductModule],
    exports:[LedgerService]
})

export class LedgerModule{

}