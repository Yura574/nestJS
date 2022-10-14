import {BadRequestException, ForbiddenException, Injectable} from "@nestjs/common";
import {SubCategoryDto} from "../Entitys/dto/subCategoryDto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FileService} from "../Files/file.service";
import {CategoryService} from "../Category/category.service";
import {SubCategory} from "../Entitys/subCategory.entity";
import {deleteFile} from "../UtilFunction/common/deleteFile";


@Injectable()
export class SubCategoryService {

    constructor(@InjectRepository(SubCategory)
                private subCategoryRepository: Repository<SubCategory>,
                private fileService: FileService,
                private categoryService: CategoryService) {
    }

    async createSubCategory(dto: SubCategoryDto, image: Express.Multer.File) {
        const {categoryId, title} = dto
        const category = await this.categoryService.findCategoryById(categoryId)
        if (!category) {
            throw new ForbiddenException(BadRequestException, 'category not found')
        }
        const fileName = image ? await this.fileService.createFile(image, 'subCategory/') : ''

        const newSubCategory = fileName
            ? await this.subCategoryRepository.save({title, image: fileName})
            : await this.subCategoryRepository.save({title})

        newSubCategory.category = await this.categoryService.findCategoryById(categoryId)
        return await this.subCategoryRepository.save(newSubCategory)
    }

    async getOneSubCategory(id: string) {
        return await this.subCategoryRepository.findOne({where: {id: +id}})
    }

    async getGoods(id: string) {
        return await this.subCategoryRepository.findOne({
            where: {id: +id},
            relations: {products: true}
        })
    }

    async deleteSubCategory(id: string) {
        try {
            //находим категорию
            const oldSubCategory = await this.subCategoryRepository.findOne({where: {id: +id}})
            //удаляем фотографию для этой категории
            deleteFile(oldSubCategory)
            //удаляем категорию и бд
            return await this.subCategoryRepository.delete({id: +id})
        } catch (err) {
            console.log(err)
        }
    }

}