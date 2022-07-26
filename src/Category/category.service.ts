import {ForbiddenException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "../Entitys/category";
import {Repository} from "typeorm";
import {CategoryDto} from "../Entitys/dto/categoryDto";
import {FileService} from "../Files/file.service";
import {CategoryUpdateDto} from "../Entitys/dto/categoryUpdateDto";
import * as fs from 'fs'
import * as path from 'path'


@Injectable()

export class CategoryService {
    constructor(@InjectRepository(Category)
                private categoryService: Repository<Category>,
                private fileService: FileService) {
    }

    async createCategory(dto: CategoryDto, image: Express.Multer.File) {
        console.log(dto)
        console.log(image)
        if (!image) {
            return await this.categoryService.save(dto)
        }
        const fileName = await this.fileService.createFile(image)
        return await this.categoryService.save({...dto, image: fileName})

    }

    async updateCategory(dto: CategoryUpdateDto, image: Express.Multer.File) {
        console.log(dto)
        const oldCategory = await this.categoryService.findOneBy({id: Number(dto.id)})

        if (!oldCategory) {
            throw new ForbiddenException(`category doesn't exist`)
        }
        if (!image) {
            return await this.categoryService.update({id: Number(dto.id)}, {title: dto.title})

        }
        try {
            const fileName = oldCategory.image.split('/')[3]
            const filePath = path.resolve(__dirname, '..', 'static', fileName)

            fs.unlinkSync(filePath)
        }
        catch (e){
            console.log(e)
        }


        const fileName = await this.fileService.createFile(image)
        const updatedCategory = await this.categoryService.update({id: Number(dto.id)}, {
            title: dto.title,
            image: fileName
        })

        return await this.categoryService.findOneBy({id: Number(dto.id)})
    }
}