import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Goods} from "../Entitys/goods.entity";
import {Repository} from "typeorm";
import {FileService} from "../Files/file.service";
import {CategoryService} from "../Category/category.service";
import {GoodsDto} from "../Entitys/dto/goodsDto";
import {SubCategoryService} from "../SubCategory/subCategory.service";


@Injectable()

export class GoodsService {
    constructor(@InjectRepository(Goods)
                private goodsRepository: Repository<Goods>,
                private fileService: FileService,
                // private subCategoryService: SubCategoryService
    ) {
    }

    async createGoods(dto: GoodsDto, image: Express.Multer.File) {
        const {title, subCategoryTitle} = dto
        // const subCategory = await this.subCategoryService.getOneSubCategory(subCategoryTitle)
        if(!image){
            const goods = await this.goodsRepository.save({title})
            // goods.subCategory = subCategory
            return goods
        }
        const fileName = await this.fileService.createFile(image)

        return await this.goodsRepository.save({title, image: fileName })


    }
}