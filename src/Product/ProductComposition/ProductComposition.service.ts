import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductComposition} from "../../Entitys/productComposition.entity";
import {Repository} from "typeorm";
import {ProductCompositionDto} from "../../Entitys/dto/productCompositionDto";
import {ProductService} from "../Product.service";


@Injectable()

export class ProductCompositionService {
    constructor(@InjectRepository(ProductComposition)
                private productCompositionRepository: Repository<ProductComposition>,
                @Inject(forwardRef(() => ProductService))
                private productService: ProductService
    ) {
    }


    async createProductComposition(dto: ProductCompositionDto) {
        const {productId, composition} = dto
        composition.map( async el => {
            const {purchaseTitle, amount, unit, price} = el
            const productComposition = await this.productCompositionRepository.save(
                {purchaseTitle, amount, unit, price})
            productComposition.product = await this.productService.getProduct(+productId)
            console.log("productComposition :", productComposition)
            return await this.productCompositionRepository.save(productComposition)
        })


    }


}