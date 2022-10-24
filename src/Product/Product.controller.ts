import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {ProductService} from "./Product.service";


@Controller('products')

export class ProductController {
    constructor(private productsService: ProductService) {
    }


    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto,
           @UploadedFile() image) {
        console.log('dto', dto)
        console.log('image', image)
        return this.productsService.createProduct(dto, image)
    }

    @Put('addImage')
    @UseInterceptors(FileInterceptor('image'))
    addImage(@Body() dto,
             @UploadedFile() image) {
        console.log(image)
        console.log(dto)
        return this.productsService.addImage(dto.id, image)
    }

    @Delete('delete/:id')
   async delete(@Param() param) {
        console.log(param.id)
        return this.productsService.deleteProduct(param.id)
    }

    @Get('one/:id')
    async getComposition(@Param() param) {
        return this.productsService.getProduct(param.id)

    }

}