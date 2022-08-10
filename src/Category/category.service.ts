import {BadRequestException, ForbiddenException, HttpException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CategoryDto} from "../Entitys/dto/categoryDto";
import {FileService} from "../Files/file.service";
import {CategoryUpdateDto} from "../Entitys/dto/categoryUpdateDto";
import * as fs from 'fs'
import * as path from 'path'
import {UserService} from "../User/user.service";
import {Category} from "../Entitys/category.entity";
import {deleteFile} from "../UtilFunction/common/deleteFile";


@Injectable()

export class CategoryService {
    constructor(@InjectRepository(Category)
                private categoryRepository: Repository<Category>,
                private fileService: FileService,
                private userService: UserService) {
    }

    async createCategory(dto: CategoryDto, image: Express.Multer.File) {
        const {title, userId} = dto
        const user = await this.userService.findUserById(userId)
        if (!user) {
            throw new ForbiddenException(BadRequestException, 'user not found')
        }
        if (!image) {
            return await this.categoryRepository.save(dto)
        }
        const fileName = await this.fileService.createFile(image, 'category/')
        const newCategory = await this.categoryRepository.save({title, image: fileName})
        newCategory.user = await this.userService.findUserById(userId)

        return await this.categoryRepository.save(newCategory)

    }

    async updateCategory(dto: CategoryUpdateDto, image: Express.Multer.File) {
        console.log(dto)
        const oldCategory = await this.categoryRepository.findOneBy({id: Number(dto.id)})

        if (!oldCategory) {
            throw new ForbiddenException(`category doesn't exist`)
        }
        if (!image) {
            return await this.categoryRepository.update({id: Number(dto.id)}, {title: dto.title})
        }
        try {
            const fileName = oldCategory.image.split('/')[3]
            const filePath = path.resolve(__dirname, '..', 'static', fileName)

            fs.unlinkSync(filePath)
        } catch (e) {
            console.log(e)
        }
        const fileName = await this.fileService.createFile(image, '')
        const updatedCategory = await this.categoryRepository.update({id: Number(dto.id)}, {
            title: dto.title,
            image: fileName
        })

        return await this.categoryRepository.findOneBy({id: Number(dto.id)})
    }

    async findCategoryById(id: string) {
        return await this.categoryRepository.findOne({where: {id: +id}})

    }

    async findSubCategories(categoryId: string) {
        return await this.categoryRepository.findOne({
            where: {
                id: +categoryId
            },
            relations: {subCategories: true},
        });
    }

    async deleteCategory(id: string) {
        try {
            //находим категорию
            const oldCategory = await this.categoryRepository.findOne({where: {id: +id}, relations: {subCategories: true}})
            //удаляем фотографию для этой категории
            if(oldCategory.subCategories.length> 0){
                return new ForbiddenException('удалите вложенные подкатегории')
            }
            else {
                deleteFile(oldCategory)
                //удаляем категорию из бд
                return await this.categoryRepository.delete({id: +id})
            }

        }
        catch (err) {
            console.log(err)
        }
    }
}