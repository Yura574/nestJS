import {Injectable} from "@nestjs/common";
import {SubCategoryDto} from "../Entitys/dto/subCategoryDto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FileService} from "../Files/file.service";
import {CategoryService} from "../Category/category.service";
import {SubCategory} from "../Entitys/subCategory.entity";


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
        const {categoryId, title} = dto
        const fileName = image ? await this.fileService.createFile(image) : ''
        // const newSubCategory = await this.subCategoryService.save({title, image: fileName})
        const newSubCategory = fileName
            ? await this.subCategoryService.save({title, image: fileName})
            : await this.subCategoryService.save({title})
            // if (!image) {
            //     newSubCategory.category = await this.categoryService.findCategoryById(categoryId)
            //     return  await this.subCategoryService.save(dto)
            // }


            newSubCategory.category = await this.categoryService.findCategoryById(categoryId)

        return await this.subCategoryService.save(newSubCategory)
    }

    async getOneSubCategory (id: string) {
        return await this.subCategoryService.findOne({where:{id: +id}})
    }
}