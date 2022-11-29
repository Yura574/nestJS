import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post, Put,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import {CategoryService} from "./category.service";
import {CategoryDto} from "../Entitys/dto/categoryDto";
import {FileInterceptor} from "@nestjs/platform-express";


@Controller('category')

export class CategoryController {
    constructor(private categoryService: CategoryService) {
    }

    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    createCategory(@Body() dto: CategoryDto,
                   @UploadedFile() image: Express.Multer.File) {
        return this.categoryService.createCategory(dto, image)
    }

    @Put('update')
    @UseInterceptors(FileInterceptor('image'))
    updateCategory(@Body() dto,
                   @UploadedFile() image: Express.Multer.File,
    ) {

        return this.categoryService.updateCategory(dto, image)
    }

    @Delete('delete/:id')
    async deleteCategory(@Param() param) {

        return this.categoryService.deleteCategory(param.id)

    }

    @Get('one/:id')
    getUserCategories(@Param() param) {
             return this.categoryService.findSubCategories(param.id)
    }

}
