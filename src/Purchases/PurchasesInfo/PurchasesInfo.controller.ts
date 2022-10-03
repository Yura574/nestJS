import {Body, Controller, Post} from "@nestjs/common";
import {PurchasesInfoService} from "./PurchasesInfo.service";
import {PurchaseInfoDto} from "../../Entitys/dto/PurchaseInfoDto";


@Controller('purchaseInfo')

export class PurchasesInfoController {
    constructor(private purchasesInfoService: PurchasesInfoService) {
    }

    @Post('create')
    createPurchasesInfo(@Body() dto: PurchaseInfoDto) {
        return this.purchasesInfoService.create(dto)
    }
}