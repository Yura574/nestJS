import {Injectable} from "@nestjs/common";
import {SubCategoryDto} from "../Entitys/dto/subCategoryDto";
import {InjectRepository} from "@nestjs/typeorm";
import {SubCategory} from "../Entitys/subCategory";
import {Repository} from "typeorm";
import {FileService} from "../Files/file.service";
import {CategoryService} from "../Category/category.service";


@Injectable()
export class SubCategoryService {

    constructor(@InjectRepository(SubCategory)
                private subCategoryService: Repository<SubCategory>,
                private fileService: FileService,
                private categoryService: CategoryService
                ) {
    }


    async createSubCategory(dto: SubCategoryDto, image: Express.Multer.File) {
        console.log(dto)
        console.log(image)
        const {categoryTitle, title}= dto

        if (!image) {
            return  await this.subCategoryService.save(dto)
        }
        const fileName=  await this.fileService.createFile(image)

        const newSubCategory = await this.subCategoryService.save({title, image: fileName})
        newSubCategory.category = await this.categoryService.findCategoryByTitle(categoryTitle)

        return await this.subCategoryService.save(newSubCategory)
    }

    async getOneSubCategory (title: string) {
        return await this.subCategoryService.findOne({where:{title}})
    }
}