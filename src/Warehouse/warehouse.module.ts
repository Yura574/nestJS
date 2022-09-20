import {Module} from "@nestjs/common";
import {WarehouseController} from "./warehouse.controller";
import {WarehousesService} from "./warehouses.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Warehouse} from "../Entitys/warehouse.entity";
import {FileModule} from "../Files/file.module";
import {UserModule} from "../User/user.module";


@Module({
    controllers: [WarehouseController],
    providers: [WarehousesService],
    imports: [TypeOrmModule.forFeature([Warehouse]), FileModule, UserModule]
})

export class WarehouseModule {
}