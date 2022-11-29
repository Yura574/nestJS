import {Body, Controller,  Get, Param, Post, Put, UploadedFile, UseInterceptors} from "@nestjs/common";
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
        return  await this.productsService.createProduct(dto, image)
    }

    @Put('addImage')
    @UseInterceptors(FileInterceptor('image'))
    addImage(@Body() dto,
             @UploadedFile() image) {
        return this.productsService.addImage(dto.id, image)
    }

    @Post('addTheSameProduct')
    addTheSameProduct(@Body() dto){}

    @Get('sum/:id')
    getSumProducts(@Param() param){
       return this.productsService.getSumProducts(param.id)
    }

    // @Post('saleProduct')
    // async saleProduct(@Body() dto) {
    //     return this.productsService.saleProduct(dto)
    // }
    @Post('writeOffProduct')
    async writeOffProduct(@Body() dto) {
        return this.productsService.writeOffProduct(dto)
    }

    @Get('one/:id')
    async getComposition(@Param() param) {
        return this.productsService.getProductById(param.id)
    }



}