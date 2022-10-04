import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PurchasesInfo} from "../../Entitys/PurchasesInfo.entity";
import {Repository} from "typeorm";
import {PurchaseInfoDto} from "../../Entitys/dto/PurchaseInfoDto";
import {PurchasesService} from "../Purchases.service";


@Injectable()

export class PurchasesInfoService {
    constructor(@InjectRepository(PurchasesInfo)
                private purchasesInfoRepository: Repository<PurchasesInfo>,
                private purchasesService: PurchasesService) {
    }

    async create (dto: PurchaseInfoDto){
        const {purchaseId, title, place, price, amount, unit, warehouse, date} = dto
        const newInfo =   await this.purchasesInfoRepository.save({title, place, price, amount, unit, warehouse, date})
        newInfo.purchases = await this.purchasesService.getInfoPurchase(purchaseId)
        return await  this.purchasesInfoRepository.save(newInfo)
     }

}