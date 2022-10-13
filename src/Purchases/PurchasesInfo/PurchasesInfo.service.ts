import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PurchasesInfo} from "../../Entitys/PurchasesInfo.entity";
import {Repository} from "typeorm";
import {purchaseInfoDto} from "../../Entitys/dto/purchaseInfoDto";
import {UserService} from "../../User/user.service";


@Injectable()

export class PurchasesInfoService {
    constructor(@InjectRepository(PurchasesInfo)
                private purchasesInfoRepository: Repository<PurchasesInfo>,
                private userService: UserService) {
    }

    async create (dto: purchaseInfoDto){
        const {userId, title, place, price, amount, unit, date} = dto
        const newInfo =   await this.purchasesInfoRepository.save({title, place, price, amount, unit,  date})
        newInfo.user = await this.userService.findUserById(userId)
        return await  this.purchasesInfoRepository.save(newInfo)
     }

     async getAllPurchasesInfo(userId: number) {
        const user = await this.userService.findUserById(userId)
         console.log(user)
         return user.purchasesInfo
     }


}