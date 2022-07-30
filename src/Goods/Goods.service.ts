import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {GoodsDto} from "../Entitys/dto/goodsDto";
import {FileService} from "../Files/file.service";
import {SubCategoryService} from "../SubCategory/subCategory.service";
import {Goods} from "../Entitys/goods.entity";


@Injectable()

export class GoodsService {


    constructor(@InjectRepository(Goods)
                private goodsService: Repository<Goods>,
                private fileService: FileService,
                private subCategoryService: SubCategoryService
    ) {
    }

    async createGoods(dto: GoodsDto, image: Express.Multer.File) {
        const {title, subCategoryId} = dto
        const fileName = image ? await this.fileService.createFile(image) : ''
        const newGoods = fileName
            ? await this.goodsService.save({title, image: fileName})
            : await this.goodsService.save({title})

        newGoods.subCategory = await this.subCategoryService.getOneSubCategory(subCategoryId)
        return await this.goodsService.save(newGoods)
    }
}