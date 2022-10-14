import {Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {ProductService} from "./Product.service";
import {ProductsDto} from "../Entitys/dto/productsDto";


@Controller('products')

export class ProductController {
    constructor(private productsService: ProductService) {
    }



    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: ProductsDto,
           @UploadedFile() image: Express.Multer.File){
        return this.productsService.createProduct(dto, image)
    }


    @Delete('delete/:id')
        delete(@Param() param){
            return this.productsService.deleteProduct(+param.id)
        }
    @Get('one/:id')
    async getComposition(@Param() param) {
        return this.productsService.getProduct(param.id)

    }

}