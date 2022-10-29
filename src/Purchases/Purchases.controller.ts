import {Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {PurchasesService} from "./Purchases.service";
import {createPurchasesDto} from "../Entitys/dto/purchasesDto";
import {FileInterceptor} from "@nestjs/platform-express";


@Controller('purchase')

export class PurchasesController {
    constructor(private purchaseService: PurchasesService) {
    }

    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    createPurchase(@Body() dto: createPurchasesDto,
                   @UploadedFile() image: Express.Multer.File) {
        return this.purchaseService.createPurchase(dto, image)
    }
    @Get('all/:id')
    getAllPurchases(@Param() param) {
        return this.purchaseService.getAllPurchases(param.id)
    }

    @Get('one/:id')
    getOnePurchase(@Param() param) {
        // return this.purchaseService.getInfoPurchase(param.id)
    }

    @Delete('delete/:id')
    deletePurchase(@Param() param) {
        return this.purchaseService.deletePurchase(param.id)
    }

}