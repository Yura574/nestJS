import {BadRequestException, ForbiddenException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {GoodsDto} from "../Entitys/dto/goodsDto";
import {FileService} from "../Files/file.service";
import {SubCategoryService} from "../SubCategory/subCategory.service";
import {Goods} from "../Entitys/goods.entity";
import * as path from "path";
import * as fs from "fs";


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
        if (!category) {
            throw new ForbiddenException(BadRequestException, 'sub category not found')
        }
        const fileName = image ? await this.fileService.createFile(image, '') : ''
        const newGoods = fileName
            ? await this.goodsRepository.save({title, image: fileName})
            : await this.goodsRepository.save({title})

        newGoods.subCategory = await this.subCategoryService.getOneSubCategory(subCategoryId)
        return await this.goodsRepository.save(newGoods)
    }

    async deleteGoods(id: number) {
        const oldGoods = await this.goodsRepository.findOne({where: {id}})
        if (oldGoods.image) {
            const fileName = oldGoods.image.split('/')[3]
            const filePath = path.resolve(__dirname, '..', 'static', fileName)
            fs.unlinkSync(filePath)
            return   this.goodsRepository.delete({id})
        } else {
          return   this.goodsRepository.delete({id})
        }

    }
}