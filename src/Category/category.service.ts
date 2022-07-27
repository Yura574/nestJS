import {ForbiddenException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "../Entitys/category";
import {Repository} from "typeorm";
import {CategoryDto} from "../Entitys/dto/categoryDto";
import {FileService} from "../Files/file.service";
import {CategoryUpdateDto} from "../Entitys/dto/categoryUpdateDto";
import * as fs from 'fs'
import * as path from 'path'
import {UserService} from "../User/user.service";


@Injectable()

export class CategoryService {
    constructor(@InjectRepository(Category)
                private categoryService: Repository<Category>,
                private fileService: FileService,
                private userService: UserService) {
    }

    async createCategory(dto: CategoryDto, image: Express.Multer.File) {
        console.log(dto)
        const {title, userId} = dto
        console.log(image)
        if (!image) {
            return await this.categoryService.save(dto)
        }
        const fileName = await this.fileService.createFile(image)
        const newCategory = await this.categoryService.save({title,  image: fileName})
        newCategory.user = await this.userService.findUserById(userId)
        return  await this.categoryService.save(newCategory)

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
    async findCategoryByTitle (title: string) {
        return await this.categoryService.findOne({where: {title}})

    }
}