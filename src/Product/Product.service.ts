import {BadRequestException, ForbiddenException, forwardRef, Inject, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FileService} from "../Files/file.service";
import {SubCategoryService} from "../SubCategory/subCategory.service";
import {Products} from "../Entitys/products.entity";
import {ProductsDto} from "../Entitys/dto/productsDto";
import {ProductCompositionService} from "./ProductComposition/ProductComposition.service";
import {deleteFile} from "../UtilFunction/common/deleteFile";


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
        console.log(image)


        const category = await this.subCategoryService.getOneSubCategory(subCategoryId)
        if (!category) {
            throw new ForbiddenException(BadRequestException, 'sub category not found')
        }
        const fileName = image ? await this.fileService.createFile(image, '') : ''
        const newProduct = fileName
            ? await this.productsRepository.save({title, image: fileName})
            : await this.productsRepository.save({title})
        console.log(newProduct.id)

        productComposition.map(() => {

            this.productCompositionService.createProductComposition({
                productId: newProduct.id,
                composition: productComposition
            })
        })

        newProduct.subCategory = await this.subCategoryService.getOneSubCategory(subCategoryId)
        return await this.productsRepository.save(newProduct)
    }

    async getProduct(id: number) {
        return await this.productsRepository.findOne({
            where: {id: +id},
            relations: {productComposition: true}
        })
    }

    async addImage(id: number, image: Express.Multer.File) {
        const product = await this.getProduct(id)
        let newImage
        if (!product.image) {
            newImage = await this.fileService.createFile(image, 'product/')
        }
        await this.productsRepository.update({id: product.id}, {
            image: newImage
        })
        return newImage
    }

    async deleteProduct(id: number) {
        // // console.log(id)
        // const oldGoods = await this.productsRepository.findOne({where: {id}})
        //
        //
        //     const product = await this.getProduct(id)
        // console.log('12',product)
        // if (product.image) {
        //     deleteFile(product)
        // }


        const product = await this.productsRepository.findOne({
            where: {id},
            relations: {productComposition: true}
        })
             if (product.image) {
                deleteFile(product)
            }
        console.log(product)
        const composition = product.productComposition
        composition.map(el => this.productCompositionService.deleteProductComposition(el.id))
        return this.productsRepository.delete({id: id})
    }

}