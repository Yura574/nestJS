import {Body, Controller, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {GoodsDto} from "../Entitys/dto/goodsDto";
import {GoodsService} from "./Goods.service";


@Controller('goods')

export class GoodsController{
    constructor(private goodsService: GoodsService) {
    }



    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: GoodsDto,
           @UploadedFile() image: Express.Multer.File){
        return this.goodsService.createGoods(dto, image)
    }
}