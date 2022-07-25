import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "../Entitys/category";
import {Repository} from "typeorm";
import {CategoryDto} from "../Entitys/dto/categoryDto";
import {FileService} from "../Files/file.service";


@Injectable()

export class CategoryService {
    constructor(@InjectRepository(Category)
                private categoryService: Repository<Category>,
                private fileService: FileService) {
    }

    async createCategory(dto: CategoryDto, image: Express.Multer.File) {
        if (!image) {
            return await this.categoryService.save(dto)
        }
        const fileName = await this.fileService.createFile(image)
        const category = await this.categoryService.save({...dto, image: fileName})
        return category
    }

    async updateCategory(id: number,dto: CategoryDto, image: Express.Multer.File){
        console.log(id)
        console.log(dto)
        const oldCategory = await this.categoryService.findOneBy({id})
        if(!oldCategory.id){
            console.error(`Category doesn't exist`)
        }
        if (!image){
            return await  this.categoryService.update(oldCategory.id, dto)
        }
        const fileName = await this.fileService.createFile(image)
       const updatedCategory = await  this.categoryService.update(oldCategory.id, {...dto, image: fileName})

        return ''

    }
}