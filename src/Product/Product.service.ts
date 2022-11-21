import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FileService} from "../Files/file.service";
import {SubCategoryService} from "../SubCategory/subCategory.service";
import {Products} from "../Entitys/products.entity";
import {ProductsDto, UpdateProductDto} from "../Entitys/dto/productsDto";
import {ProductCompositionService} from "./ProductComposition/ProductComposition.service";
import {deleteFile} from "../UtilFunction/common/deleteFile";
import {UserService} from "../User/user.service";
import {WarehouseService} from "../Warehouse/warehouse.service";
import {PurchasesService} from "../Purchases/Purchases.service";
import {AccountsService} from "../Accounts/Accounts.service";
import {LedgerService} from "../Ledger/Ledger.service";


@Injectable()

export class ProductService {


    constructor(@InjectRepository(Products)
                private productsRepository: Repository<Products>,
                private fileService: FileService,
                private userService: UserService,
                private subCategoryService: SubCategoryService,
                private warehouseService: WarehouseService,
                private purchasesService: PurchasesService,
                private accountsService: AccountsService,
                @Inject(forwardRef(() => LedgerService))
                private ledgerService: LedgerService,
                @Inject(forwardRef(() => ProductCompositionService))
                private productCompositionService: ProductCompositionService
    ) {
    }

    async createProduct(dto: ProductsDto, image: Express.Multer.File) {
        const {userId, title, subCategoryId, count, productComposition, primeCost} = dto
        const user = await this.userService.findUserById(userId)
        if (user.products.length > 0) {
            const productExist = user.products.find(el => el.title === title)
            if (productExist) {
                const product = await this.productsRepository.findOne({
                    where: {id: productExist.id},
                    relations: {productComposition: true}
                })
                if (product.title === title) {
                    if (product.productComposition.length === productComposition.length) {
                        let result = []
                        let error = []
                        for (let i = 0; i < product.productComposition.length; i++) {
                            for (let j = 0; j < productComposition.length; j++) {
                                if (product.productComposition[i].purchaseTitle === productComposition[j].purchaseTitle) {
                                    if (+product.productComposition[i].amount === +productComposition[j].amount) {
                                        result.push(productComposition[j])
                                    } else {
                                        error.push(productComposition[j].purchaseTitle)
                                    }
                                }
                            }
                        }
                        if (result.length === product.productComposition.length) {
                            result.map(async el => {
                                const purchase = await this.purchasesService.findPurchaseByTitle(el.warehouseId, el.purchaseTitle)
                                const newAmount = ((+purchase.amount - +el.amount * count).toFixed(2)).toString()
                                const newPrice = ((+purchase.price - +el.price * count).toFixed(2)).toString()
                                const {id, title, unit, unitPrice, place, image, date} = purchase
                                await this.purchasesService.updatePurchase(id, title, newAmount, unit, image, place, newPrice, date, unitPrice)
                            })
                            await this.productsRepository.update({id: product.id}, {
                                count: product.count + count

                            })

                            return 1
                        } else {
                            return error
                        }
                    }
                }
            }
        }
        const fileName = image ? await this.fileService.createFile(image, 'product') : ''
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
        await this.productsRepository.save(newProduct)
        return await this.getProductById(+newProduct.id)
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

    async getSumProducts(userId: number) {
        const user = await this.userService.findUserById(userId)
        const purchases = user.products
        const initValue = 0
        return purchases.reduce((acc, currentValue) => acc + +(+currentValue.primeCost * currentValue.count).toFixed(2), initValue)

    }

    async writeOffProduct(dto) {
        const {userId, productId, count, operation, price, data} = dto
        const user = await this.userService.findUserById(userId)
        const product = await this.productsRepository.findOne({
            where: {id: productId},
            relations: {productComposition: true}
        })
        if (product.count - count > 0) {
            const newCount = product.count - count
            await this.updateProduct({...product, count: newCount})
            const accounts = await this.accountsService.getAccounts(userId)
            switch (operation) {
                case 'writeOff': {
                    const newPrimeCost = (+accounts.primeCost + +product.primeCost * count).toString()
                    const newPrimeCostForAccount = (+accounts.primeCost + +product.primeCost * count).toString()
                    const newProfit = (+accounts.profit - +product.primeCost * count).toString()
                    const newProfitForAccount = (+accounts.profit - +product.primeCost * count).toString()
                    await this.ledgerService.createJournalEntry(
                        {user, title: product.title, operation, count, price, primeCost: product.primeCost, profit: -product.primeCost, data})
                    return await this.accountsService.updateAccounts({
                        userId, primeCost: newPrimeCostForAccount, profit: newProfitForAccount,
                        investment: accounts.investment, duty: accounts.duty
                    })
                }
                case 'sell': {
                    const newPrimeCost = +accounts.primeCost + +product.primeCost * count
                    const newProfit =(+price - +product.primeCost) * count
                    const newProfitForAccount = (+accounts.profit +(+price - +product.primeCost) * count).toString()
                    console.log(newProfit)
                    await this.ledgerService.createJournalEntry(
                        {user, title: product.title, operation, count, price, primeCost: +product.primeCost, profit: newProfit, data})
                    return await this.accountsService.updateAccounts({
                        userId, primeCost: newPrimeCost, profit: newProfitForAccount,
                        investment: accounts.investment, duty: accounts.duty
                    })
                }
            }

        }
        if (product.image) {
            deleteFile(product)
        }
        const composition = product.productComposition
        composition.map(el => this.productCompositionService.deleteProductComposition(el.id))
        return this.productsRepository.delete({id: productId})
    }

    // async saleProduct(id: number) {
    //     const product = await this.productsRepository.findOne({
    //         where: {id},
    //         relations: {productComposition: true}
    //     })
    //     if (product.image) {
    //         deleteFile(product)
    //     }
    //     const composition = product.productComposition
    //     composition.map(el => this.productCompositionService.deleteProductComposition(el.id))
    //     return this.productsRepository.delete({id: id})
    // }
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


}