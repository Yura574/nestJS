import {BadRequestException, ForbiddenException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {GoodsDto} from "../Entitys/dto/goodsDto";
import {FileService} from "../Files/file.service";
import {SubCategoryService} from "../SubCategory/subCategory.service";
import {Goods} from "../Entitys/goods.entity";
import {isExist} from "../UtilFunction/CheckFunction/isExist";


@Injectable()

export class GoodsService {


    constructor(@InjectRepository(Goods)
                private goodsRepository: Repository<Goods>,
                private fileService: FileService,
                private subCategoryService: SubCategoryService
    ) {
    }

    async createGoods(dto: GoodsDto, image: Express.Multer.File) {
        const {title, subCategoryId} = dto
        const category = await this.subCategoryService.getOneSubCategory(subCategoryId)
        if(!category){
            throw new ForbiddenException(BadRequestException, 'sub category not found')
        }
        const fileName = image ? await this.fileService.createFile(image) : ''
        const newGoods = fileName
            ? await this.goodsRepository.save({title, image: fileName})
            : await this.goodsRepository.save({title})

        newGoods.subCategory = await this.subCategoryService.getOneSubCategory(subCategoryId)
        return await this.goodsRepository.save(newGoods)
    }

    async deleteGoods(id: string){

        return this.goodsRepository.delete({id: +id})
    }
}