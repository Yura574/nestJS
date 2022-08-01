import {Body, Controller, Delete, Param, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
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


    @Delete('delete/:id')
        delete(@Param() param){
            return this.goodsService.deleteGoods(+param.id)
        }

}