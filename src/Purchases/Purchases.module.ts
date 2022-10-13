import {Module} from "@nestjs/common";
import {PurchasesController} from "./Purchases.controller";
import {PurchasesService} from "./Purchases.service";
import {Purchases} from "../Entitys/Purchases.entity";
import {FileModule} from "../Files/file.module";
import {WarehouseModule} from "../Warehouse/warehouse.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "../User/user.module";


@Module({
    controllers: [PurchasesController],
    providers: [PurchasesService],
    imports: [TypeOrmModule.forFeature([Purchases]), WarehouseModule,  UserModule, FileModule],
    exports:[PurchasesService]
})

export class PurchasesModule {

}