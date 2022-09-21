import {Body, Controller, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {PurchasesService} from "./Purchases.service";
import {CreatePurchasesDto} from "../Entitys/dto/purchasesDto";
import {FileInterceptor} from "@nestjs/platform-express";


@Controller('purchase')

export class PurchasesController {
    constructor(private purchaseService: PurchasesService) {
    }

    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    createPurchase (@Body() dto: CreatePurchasesDto,
                    @UploadedFile() image: Express.Multer.File) {
        return this.purchaseService.createPurchase(dto, image)
    }
}