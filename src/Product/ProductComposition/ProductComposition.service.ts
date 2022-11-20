import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductComposition} from "../../Entitys/productComposition.entity";
import {Repository} from "typeorm";
import {  ProductCompositionDto} from "../../Entitys/dto/productCompositionDto";
import {ProductService} from "../Product.service";
import {WarehouseService} from "../../Warehouse/warehouse.service";
import {PurchasesService} from "../../Purchases/Purchases.service";


@Injectable()

export class ProductCompositionService {
    constructor(@InjectRepository(ProductComposition)
                private productCompositionRepository: Repository<ProductComposition>,
                @Inject(forwardRef(() => ProductService))
                private productService: ProductService,
                private warehouseService: WarehouseService,
                private purchaseService: PurchasesService
    ) {
    }

    async createProductComposition(dto: ProductCompositionDto) {
        const {productId, count, composition} = dto
        composition.map(async composition => {
            const warehouse = await this.warehouseService.findWarehouseById(+composition.warehouseId)
            const purchases = warehouse.purchases
            const updatedPurchase = purchases.find(purchases => purchases.title === composition.purchaseTitle)
            if (updatedPurchase) {
                const {id, title, price, unitPrice, unit, amount, place, date, image} = updatedPurchase
                const newAmount = ((+amount - +composition.amount * count).toFixed(2)).toString()
                const newPrice = ((+price - +composition.price * count).toFixed(2)).toString()
                await this.purchaseService.updatePurchase(id, title, newAmount, unit, image, place,
                    newPrice, date, unitPrice)
               // await this.editProductComposition({purchase:updatedPurchase, composition, count})
            }
            const {purchaseTitle, amount, unit, price} = composition
            // const newAmount = (+amount ).toString()
            const productComposition = await this.productCompositionRepository.save(
                {purchaseTitle,  amount, unit, price})
            productComposition.product = await this.productService.getProductById(+productId)
            await this.productCompositionRepository.save(productComposition)
        })

    }

    // async editProductComposition(dto: EditProductCompositionDto){
    //     const {composition, count, purchase} =dto
    //
    //             const {id, title, price, unitPrice, unit, amount, place, date, image} = purchase
    //             const newAmount = ((+amount - +composition.amount * count).toFixed(2)).toString()
    //             await this.purchaseService.updatePurchase(id, title, newAmount, unit, image, place,
    //                 price, date, unitPrice)
    //
    // }

    async deleteProductComposition(id: number) {
        return await this.productCompositionRepository.delete({id})
    }


}