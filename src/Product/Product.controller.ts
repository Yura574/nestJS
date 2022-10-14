import {Body, Controller, Delete, Param, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {GoodsDto} from "../Entitys/dto/goodsDto";
import {ProductService} from "./Product.service";


@Controller('goods')

export class ProductController {
    constructor(private productsService: ProductService) {
    }



    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: GoodsDto,
           @UploadedFile() image: Express.Multer.File){
        return this.productsService.createGoods(dto, image)
    }


    @Delete('delete/:id')
        delete(@Param() param){
            return this.productsService.deleteGoods(+param.id)
        }

}