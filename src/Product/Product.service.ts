import {BadRequestException, ForbiddenException, forwardRef, Inject, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FileService} from "../Files/file.service";
import {SubCategoryService} from "../SubCategory/subCategory.service";
import * as path from "path";
import * as fs from "fs";
import {Products} from "../Entitys/products.entity";
import {ProductsDto} from "../Entitys/dto/productsDto";
import {ProductCompositionService} from "./ProductComposition/ProductComposition.service";


@Injectable()

export class ProductService {


    constructor(@InjectRepository(Products)
                private productsRepository: Repository<Products>,
                private fileService: FileService,
                private subCategoryService: SubCategoryService,
                @Inject(forwardRef(() => ProductCompositionService))
                private productCompositionService: ProductCompositionService
    ) {
    }

    async createProduct(dto: ProductsDto, image: Express.Multer.File) {
        const {title, subCategoryId, productComposition} = dto


        const category = await this.subCategoryService.getOneSubCategory(subCategoryId)
        if (!category) {
            throw new ForbiddenException(BadRequestException, 'sub category not found')
        }
        const fileName = image ? await this.fileService.createFile(image, '') : ''
        const newGoods = fileName
            ? await this.productsRepository.save({title, image: fileName})
            : await this.productsRepository.save({title})
        console.log(newGoods.id)

        productComposition.map(el => {

           this.productCompositionService.createProductComposition(el)
        })

        newGoods.subCategory = await this.subCategoryService.getOneSubCategory(subCategoryId)
        return await this.productsRepository.save(newGoods)
    }
    async getProduct(id: number) {
        return  await this.productsRepository.findOne({
            where: {id: +id},
            relations: {productComposition: true}
        })

    }

    async deleteProduct(id: number) {
        const oldGoods = await this.productsRepository.findOne({where: {id}})
        if (oldGoods.image) {
            const fileName = oldGoods.image.split('/')[3]
            const filePath = path.resolve(__dirname, '..', 'static', fileName)
            fs.unlinkSync(filePath)
            return   this.productsRepository.delete({id})
        } else {
          return   this.productsRepository.delete({id})
        }

    }

}