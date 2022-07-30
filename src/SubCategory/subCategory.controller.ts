import {Body, Controller, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {SubCategoryService} from "./subCategory.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {SubCategoryDto} from "../Entitys/dto/subCategoryDto";


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