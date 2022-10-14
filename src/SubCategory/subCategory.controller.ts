import {Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {SubCategoryService} from "./subCategory.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {SubCategoryDto} from "../Entitys/dto/subCategoryDto";


@Controller('subCategory')
export class SubCategoryController {

    constructor(private subCategoryService: SubCategoryService,
                ) {
    }

    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: SubCategoryDto,
           @UploadedFile() image: Express.Multer.File) {
        console.log(dto)
        return this.subCategoryService.createSubCategory(dto, image)
    }

    @Get('one/:id')
    getGoods(@Param() param) {
        return this.subCategoryService.getGoods(param.id)
    }

    @Delete('delete/:id')
    async delete(@Param() param) {
        console.log(param)
        return this.subCategoryService.deleteSubCategory(param.id)
    }



}