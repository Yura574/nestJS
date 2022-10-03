import {Module} from "@nestjs/common";
import {PurchasesInfoController} from "./PurchasesInfo.controller";
import {PurchasesInfoService} from "./PurchasesInfo.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PurchasesInfo} from "../../Entitys/PurchasesInfo.entity";
import {PurchasesModule} from "../Purchases.module";


@Module({
    controllers:[PurchasesInfoController],
    providers:[PurchasesInfoService],
    imports:[TypeOrmModule.forFeature([PurchasesInfo]), PurchasesModule]
})

export class PurchasesInfoModule {

}