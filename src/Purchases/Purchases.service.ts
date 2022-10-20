import {BadRequestException, ForbiddenException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {WarehouseService} from "../Warehouse/warehouse.service";
import {Purchases} from "../Entitys/Purchases.entity";
import {createPurchasesDto} from "../Entitys/dto/purchasesDto";
import {isExist} from "../UtilFunction/common/isExist";
import {FileService} from "../Files/file.service";
import {UserService} from "../User/user.service";
import {deleteFile} from "../UtilFunction/common/deleteFile";


@Injectable()

export class PurchasesService {
    constructor(@InjectRepository(Purchases)
                private purchasesRepository: Repository<Purchases>,
                private warehouseService: WarehouseService,
                private userService: UserService,
                private fileService: FileService) {
    }

    async createPurchase(dto: createPurchasesDto, image: Express.Multer.File) {
        const {userId, warehouseId, title, price, place, amount, unit, unitPrice, date} = dto
        const warehouse = await this.warehouseService.findWarehouseById(warehouseId)

        if (!warehouse) {
            const error = new ForbiddenException(BadRequestException, 'warehouse not found')
            return {error}
        }
        const allPurchases = warehouse.purchases

        const exist = isExist(allPurchases, title, 'purchase')
        // если название такое существует, возвращает ошибку "such title already exist"

        if (exist) {
            const currentPurchase = allPurchases.filter(el => el.title === title)
            console.log(currentPurchase)
            const newPurchase = {
                ...currentPurchase[0],
                date: date,
                price: price,
                amount: +currentPurchase[0].amount + +amount,
            }
            return await this.purchasesRepository.update({title: newPurchase.title}, {
                price: newPurchase.price,
                amount: newPurchase.amount.toString(),
                date: newPurchase.date
            })
        }

        if (!image) {
            const newPurchase = await this.purchasesRepository.save({
                title,
                price,
                place,
                amount,
                unit,
                unitPrice,
                date
            })
            newPurchase.warehouse = await this.warehouseService.findWarehouseById(warehouseId)
            return await this.purchasesRepository.save(newPurchase)
        }
        const fileName = await this.fileService.createFile(image, 'purchases/')
        const newPurchase = await this.purchasesRepository.save({
            title,
            price,
            place,
            amount,
            unit,
            unitPrice,
            date,
            image: fileName
        })
        newPurchase.warehouse = await this.warehouseService.findWarehouseById(warehouseId)
        newPurchase.user = await this.userService.findUserById(userId)
        return await this.purchasesRepository.save(newPurchase)
    }

    async getAllPurchases(userId: number) {
        const user = await this.userService.findUserById(userId)
        return user.purchases
    }

    // async getInfoPurchase (purchaseId: number){
    //     const purchase = await this.purchasesRepository.findOne(
    //         {where:{id:purchaseId}, relations:{purchaseInfo: true}})
    //     return purchase
    // }

    async deletePurchase(id: number) {
        const purchase = await this.purchasesRepository.findOne({where: {id}})
        console.log(purchase)
        if (purchase.image) {
            deleteFile(purchase)
        }
        return this.purchasesRepository.delete({id})
    }
}