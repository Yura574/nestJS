import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PurchasesInfo} from "../../Entitys/PurchasesInfo.entity";
import {Repository} from "typeorm";
import {purchaseInfoDto} from "../../Entitys/dto/purchaseInfoDto";
import {UserService} from "../../User/user.service";
import {PurchasesService} from "../Purchases.service";


@Injectable()

export class PurchasesInfoService {
    constructor(@InjectRepository(PurchasesInfo)
                private purchasesInfoRepository: Repository<PurchasesInfo>,
                private purchaseService: PurchasesService,
                private userService: UserService) {
    }

    async create(dto: purchaseInfoDto) {
        const {userId, title, place, price, amount, unit, unitPrice, date} = dto

        const newInfo = await this.purchasesInfoRepository.save({title, place, price, amount, unit, unitPrice, date})
        newInfo.user = await this.userService.findUserById(userId)
        return await this.purchasesInfoRepository.save(newInfo)
    }

    async getAllPurchasesInfo(userId: number) {
        const user = await this.userService.findUserById(userId)
        console.log(user)
        return user.purchasesInfo
    }

    async deletePurchaseInfo(idPurchaseInfo: number) {
        const purchaseInfo = await this.purchasesInfoRepository.findOne({
            where: {id: idPurchaseInfo},
            relations: {user: true}
        })
        const purchase = await this.userService.findUserById(purchaseInfo.user.id)
        const allPurchases = purchase.purchases
        const idPurchase = allPurchases.filter(el => el.title === purchaseInfo.title)
        console.log(purchaseInfo)
        console.log(allPurchases)
        const {
            id, title, price, amount, unit, unitPrice, date, image, place, user, warehouse
        } = idPurchase[0]
        const newAmount = (+amount - +purchaseInfo.amount).toString()
        if (+newAmount === 0) {
            await this.purchaseService.deletePurchase(id)
        } else if (+newAmount < 0) {
            throw new Error('вы пытаетесь удалить больше чем есть материала на складе')
        } else {
            await this.purchaseService.updatePurchase(id, title, newAmount, unit, image, place, price, date, unitPrice)
        }
        return await this.purchasesInfoRepository.delete({title: purchaseInfo.title})

    }

    async getOnePurchaseInfo(id: number) {
        return await this.purchasesInfoRepository.findOne({where: {id}})
    }


}