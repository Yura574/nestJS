import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Goods} from "../Entitys/goods.entity";
import {GoodsDto} from "../Entitys/dto/goodsDto";
import {FileService} from "../Files/file.service";
import {SubCategoryService} from "../SubCategory/subCategory.service";


@Injectable()

export class GoodsService {


    constructor(@InjectRepository(Goods)
                private goodsService: Repository<Goods>,
                private fileService: FileService,
                private subCategoryService: SubCategoryService
                // private sub: SubCategoryService

    ) {
    }

    async createGoods(dto: GoodsDto, image: Express.Multer.File) {
        const {title, subCategoryTitle} = dto
        // const subCategory = await this.subCategoryService.getOneSubCategory(subCategoryTitle)
        if(!image){
         const goods = await this.goodsService.save({title})
            // goods.subCategory = subCategory
            return goods
        }
        const fileName = await this.fileService.createFile(image)

        return await this.goodsService.save({title, image: fileName })


    }
}