import {forwardRef, HttpException, Inject, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Ledger} from "../Entitys/ledger.entity";
import {Repository} from "typeorm";
import {sellJournalEntryDto} from "../Entitys/dto/ledgerDto";
import {UserService} from "../User/user.service";
import {ProductService} from "../Product/Product.service";


@Injectable()

export class LedgerService {
    constructor(@InjectRepository(Ledger)
                private legerRepository: Repository<Ledger>,
                private userService: UserService,
                @Inject(forwardRef(() => ProductService))
                private productService: ProductService
    ) {
    }

    async getJournalEntries(id: number) {
        return await this.legerRepository.find({where: {user:{id}}})

    }

    async sellJournalEntry(dto: sellJournalEntryDto) {
        const {userId, title, operation, count, price, primeCost, data} = dto
        const userProducts = await this.userService.findUserById(userId)
        let product = userProducts.products.find(el => el.title === title)
        const newProduct = {...product, count: product.count - count}
        if (newProduct.count < 0) {
            const error = new HttpException('вы пытаетесь удалить больше, чем есть на складе', 403)
            return {error}
        }
        const profit = price - primeCost

        const user = await this.userService.findUserById(userId)
        const journalEntry = await this.legerRepository.save({
            title, operation, count, price: price.toString(),
            primeCost: primeCost.toString(), profit: profit.toString(), data, user
        })

        if (newProduct.count === 0) {
            return await this.productService.deleteProduct(product.id)
        }
        await this.productService.updateProduct({
            id: newProduct.id, count: newProduct.count,
            title: newProduct.title, primeCost: newProduct.primeCost, image: newProduct.image
        })
        delete journalEntry.user
        return journalEntry
    }

    async createJournalEntry (dto) {
        const {user,title, count, price, primeCost, profit, investment, operation, data} = dto
        console.log(profit)
        return await this.legerRepository.save(
            {user,title, count, price, primeCost, profit, operation, data })
    }

    async deleteJournalEntry(id: number){
        return await this.legerRepository.delete({id})
    }


}