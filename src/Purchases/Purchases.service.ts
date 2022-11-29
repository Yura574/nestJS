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
        console.log(dto)
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
            const newPurchase = {
                ...currentPurchase[0],
                date: date,
                price: +price + +price,
                amount: +currentPurchase[0].amount + +amount,
            }
            return await this.purchasesRepository.update({title: newPurchase.title}, {
                price: newPurchase.price.toString(),
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
            newPurchase.user = await this.userService.findUserById(userId)
            return await this.purchasesRepository.save(newPurchase)
        } else {
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

    }

    async getAllPurchases(userId: number) {
        const user = await this.userService.findUserById(userId)
        //для каждой закупки находим к какому складу относится, добавляем закупкам id склада к которому она относиться,
        //и возвращаем массив закупок с id склада
        return await Promise.all(user.purchases.map(async (el) => {
            const purchase = await this.purchasesRepository.findOne({where: {id: el.id}, relations: {warehouse: true}})
            return {...el, warehouseId: purchase.warehouse.id}
        }))
    }
    async getSumPurchases(userId: number){
        const user = await this.userService.findUserById(userId)
        const purchases = user.purchases
        const initValue = 0
        return purchases.reduce((acc, currentValue)=> acc+ +currentValue.price, initValue)


    }

    // async getInfoPurchase (purchaseId: number){
    //     const purchase = await this.purchasesRepository.findOne(
    //         {where:{id:purchaseId}, relations:{purchaseInfo: true}})
    //     return purchase
    // }
    async updatePurchase(id: number, title: string, amount: string, unit: string, image: any,
                         place: string, price: string, date: string, unitPrice: string) {
        return await this.purchasesRepository.update({id}, {
            title, image, amount, unit, price, place, unitPrice, date
        })

    }

    async findPurchaseByTitle(warehouseId: number, title: string) {
        const warehouse = await this.warehouseService.findWarehouseById(warehouseId)
        return  warehouse.purchases.find( el => el.title === title)
    }

    async deletePurchase(id: number) {
        const purchase = await this.purchasesRepository.findOne({where: {id}})
        if (purchase.image) {
            deleteFile(purchase)
        }
        return this.purchasesRepository.delete({id})
    }
}