import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {ProductService} from "./Product.service";


@Controller('products')

export class ProductController {
    constructor(private productsService: ProductService) {
    }


    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    async create(@Body() dto,
                 @UploadedFile() image) {
        const newProduct = await this.productsService.createProduct(dto, image)
        return await this.productsService.getProductById(+newProduct.id)


    }

    @Put('addImage')
    @UseInterceptors(FileInterceptor('image'))
    addImage(@Body() dto,
             @UploadedFile() image) {
        console.log(image)
        return this.productsService.addImage(dto.id, image)
    }

    @Delete('delete/:id')
    async delete(@Param() param) {
        return this.productsService.deleteProduct(param.id)
    }

    @Get('one/:id')
    async getComposition(@Param() param) {
        return this.productsService.getProductById(param.id)
    }

    @Post('writeOff')
    writeOff(@Body() dto) {
        return this.productsService.writeOff(dto)
    }


}