import {Module} from "@nestjs/common";
import {WarehouseController} from "./warehouse.controller";
import {WarehousesService} from "./warehouses.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Warehouse} from "../Entitys/warehouse.entity";


@Module({
    controllers: [WarehouseController],
    providers: [WarehousesService],
    imports: [TypeOrmModule.forFeature([Warehouse])]
})

export class WarehouseModule {
}