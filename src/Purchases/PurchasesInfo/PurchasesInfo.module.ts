import {Module} from "@nestjs/common";
import {PurchasesInfoController} from "./PurchasesInfo.controller";
import {PurchasesInfoService} from "./PurchasesInfo.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PurchasesInfo} from "../../Entitys/PurchasesInfo.entity";
import {UserModule} from "../../User/user.module";


@Module({
    controllers:[PurchasesInfoController],
    providers:[PurchasesInfoService],
    imports:[TypeOrmModule.forFeature([PurchasesInfo]), UserModule]
})

export class PurchasesInfoModule {

}