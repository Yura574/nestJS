import {BadRequestException, ForbiddenException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {WarehouseService} from "../Warehouse/warehouse.service";
import {Purchases} from "../Entitys/Purchases.entity";
import {CreatePurchasesDto} from "../Entitys/dto/purchasesDto";
import {isExist} from "../UtilFunction/common/isExist";
import {FileService} from "../Files/file.service";


@Injectable()

export class PurchasesService {
    constructor(@InjectRepository(Purchases)
                private purchasesRepository: Repository<Purchases>,
                private warehouseService: WarehouseService,
                private fileService: FileService) {
    }

    async createPurchase(dto: CreatePurchasesDto, image: Express.Multer.File) {
        const {warehouseId, title} = dto
        const warehouse = await this.warehouseService.findWarehouseById(warehouseId)

        if (!warehouse) {
            const error = new ForbiddenException(BadRequestException, 'warehouse not found')
            return {error}
        }
        const allPurchases = warehouse.purchases

        const exist = isExist(allPurchases, title, 'purchase')
        // если название такое существует, возвращает ошибку "such title already exist"

        if (exist) {
            return exist
        }

        if (!image) {
            const newPurchase = await this.purchasesRepository.save({title})
            newPurchase.warehouse = await this.warehouseService.findWarehouseById(warehouseId)
            return await this.purchasesRepository.save(newPurchase)
        }
        const fileName = await this.fileService.createFile(image, 'purchases/')
        const newPurchase = await this.purchasesRepository.save({title, image: fileName})
        newPurchase.warehouse = await this.warehouseService.findWarehouseById(warehouseId)
        return  await this.purchasesRepository.save(newPurchase)
    }
}