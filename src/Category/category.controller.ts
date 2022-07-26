import {Body, Controller, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {CategoryService} from "./category.service";
import {CategoryDto} from "../Entitys/dto/categoryDto";
import {FileInterceptor} from "@nestjs/platform-express";
import {CategoryUpdateDto} from "../Entitys/dto/categoryUpdateDto";


@Controller('category')

export class CategoryController{
    constructor(private categoryService: CategoryService) {
    }

    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    createCategory(@Body() dto: CategoryDto,
                   @UploadedFile() image: Express.Multer.File){
        console.log(image.originalname)
        return this.categoryService.createCategory(dto, image)
    }

    @Post('update')
    @UseInterceptors(FileInterceptor('image'))
    updateCategory(@Body() dto: CategoryUpdateDto,
                   @UploadedFile() image: Express.Multer.File,
                   ){


        return this.categoryService.updateCategory( dto, image)
    }

}
