import {Body, Controller, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {GoodsService} from "./Goods.service";
import {GoodsDto} from "../Entitys/dto/goodsDto";
import {FileInterceptor} from "@nestjs/platform-express";


@Controller('goods')

export class GoodsController {
    constructor(private goodsService: GoodsService) {
    }

    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: GoodsDto,
           @UploadedFile() image: Express.Multer.File){
        return this.goodsService.createGoods(dto, image)
    }
}