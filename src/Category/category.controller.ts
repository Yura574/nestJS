import {Body, Controller, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {CategoryService} from "./category.service";
import {CategoryDto} from "../Entitys/dto/categoryDto";
import {FileInterceptor} from "@nestjs/platform-express";


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
    updateCategory(@Body() dto: CategoryDto,
                   @UploadedFile() image: Express.Multer.File,
                   id: number){
        console.log(id)
        return this.categoryService.updateCategory(id, dto, image)
    }

}
