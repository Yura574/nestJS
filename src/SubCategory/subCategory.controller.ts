import {Body, Controller, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {SubCategoryDto} from "../Entitys/dto/subCategoryDto";
import {SubCategoryService} from "./SubCategory.service";
import {FileInterceptor} from "@nestjs/platform-express";


@Controller('subCategory')
export class SubCategoryController{
constructor(private subCategoryService: SubCategoryService) {
}

    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: SubCategoryDto,
           @UploadedFile() image: Express.Multer.File){
        return this.subCategoryService.createSubCategory(dto, image)
    }

}