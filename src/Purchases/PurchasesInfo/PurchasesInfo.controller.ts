import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {PurchasesInfoService} from "./PurchasesInfo.service";
import {purchaseInfoDto} from "../../Entitys/dto/purchaseInfoDto";


@Controller('purchaseInfo')

export class PurchasesInfoController {
    constructor(private purchasesInfoService: PurchasesInfoService) {
    }

    @Post('create')
    createPurchasesInfo(@Body() dto: purchaseInfoDto) {
        return this.purchasesInfoService.create(dto)
    }

    @Get('all/:id')
    getAllPurchasesInfo(@Param() param){
        console.log(param.id)
        return this.purchasesInfoService.getAllPurchasesInfo(param.id)
    }

}