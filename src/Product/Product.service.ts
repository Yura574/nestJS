import {BadRequestException, ForbiddenException, forwardRef, Inject, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FileService} from "../Files/file.service";
import {SubCategoryService} from "../SubCategory/subCategory.service";
import {Products} from "../Entitys/products.entity";
import {ProductsDto, UpdateProductDto} from "../Entitys/dto/productsDto";
import {ProductCompositionService} from "./ProductComposition/ProductComposition.service";
import {deleteFile} from "../UtilFunction/common/deleteFile";
import {UserService} from "../User/user.service";


@Injectable()

export class ProductService {


    constructor(@InjectRepository(Products)
                private productsRepository: Repository<Products>,
                private fileService: FileService,
                private userService: UserService,
                private subCategoryService: SubCategoryService,
                @Inject(forwardRef(() => ProductCompositionService))
                private productCompositionService: ProductCompositionService
    ) {
    }

    async createProduct(dto: ProductsDto, image: Express.Multer.File) {
        const {userId, title, subCategoryId, count, productComposition, primeCost} = dto

        const category = await this.subCategoryService.getOneSubCategory(subCategoryId)
        if (!category) {
            throw new ForbiddenException(BadRequestException, 'sub category not found')
        }
        const fileName = image ? await this.fileService.createFile(image, '') : ''
        const newProduct = fileName
            ? await this.productsRepository.save({title, primeCost, count, image: fileName})
            : await this.productsRepository.save({title, primeCost, count})

        await this.productCompositionService.createProductComposition({
            productId: newProduct.id,
            count,
            composition: productComposition
        })
        newProduct.user = await this.userService.findUserById(userId)
        newProduct.subCategory = await this.subCategoryService.getOneSubCategory(subCategoryId)
        return await this.productsRepository.save(newProduct)
    }

    async getProductById(id: number) {
        return await this.productsRepository.findOne({
            where: {id},
            relations: {productComposition: true}
        })
    }


    async addImage(id: number, image: Express.Multer.File) {
        const product = await this.getProductById(id)
        let newImage
        if (product.image) {
            deleteFile(product)
        }
        newImage = await this.fileService.createFile(image, 'product/')
        await this.productsRepository.update({id: product.id}, {
            image: newImage
        })
        return newImage
    }

    async updateProduct(dto: UpdateProductDto) {
        const {id, title, count, primeCost, image} = dto
        return await this.productsRepository.update({id}, {
            title, count, primeCost, image
        })
    }

    async deleteProduct(id: number) {
        const product = await this.productsRepository.findOne({
            where: {id},
            relations: {productComposition: true}
        })
        if (product.image) {
            deleteFile(product)
        }
        const composition = product.productComposition
        composition.map(el => this.productCompositionService.deleteProductComposition(el.id))
        return this.productsRepository.delete({id: id})
    }

    async writeOff(dto) {

    }

}