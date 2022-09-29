import {BadRequestException, ForbiddenException, HttpException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Warehouse} from "../Entitys/warehouse.entity";
import {FileService} from "../Files/file.service";
import {UserService} from "../User/user.service";
import {CreateWarehouseDto} from "../Entitys/dto/warehouseDto";
import {isExist} from "../UtilFunction/common/isExist";
import {deleteFile} from "../UtilFunction/common/deleteFile";


@Injectable()

export class WarehouseService {
    constructor(@InjectRepository(Warehouse)
                private warehouseRepository: Repository<Warehouse>,
                private fileService: FileService,
                private userService: UserService) {
    }

    async createWarehouse(dto: CreateWarehouseDto, image: Express.Multer.File) {
        try {
            const {userId, title} = dto
            const user = await this.userService.findUserById(userId)
            if (!user) {
                const error = new ForbiddenException(BadRequestException, 'user not found')
                return {error}
            }
            const allWarehouse = user.warehouses

            const exist = isExist(allWarehouse, title, 'warehouse')
            // если название такое существует, возвращает ошибку "such title already exist"
            if (exist) {
                return exist
            }
            console.log(exist)
            if (!image) {
                const newWarehouse = await this.warehouseRepository.save({title})
                newWarehouse.user = await this.userService.findUserById(userId)
                return await this.warehouseRepository.save(newWarehouse)
            }
            const fileName = await this.fileService.createFile(image, 'warehouses/')
            const newWarehouse = await this.warehouseRepository.save({title, image: fileName})
            newWarehouse.user = await this.userService.findUserById(userId)
            return await this.warehouseRepository.save(newWarehouse)
        } catch (err) {
            console.log(err)
        }

    }

    async getAllWarehouses(userId: number) {
        const user = await this.userService.findUserById(userId)
        return user.warehouses
    }

    async findWarehouseById(warehouseId: number) {
        return await this.warehouseRepository.findOne(
            {where: {id: warehouseId}, relations: {purchases: true}}
        )
    }

    async deleteWarehouse(warehouseId: number) {
        try {
            const oldWarehouse = await this.warehouseRepository.findOne(
                {where: {id: warehouseId}, relations:{purchases: true}})
            if (oldWarehouse.purchases.length > 0){
                const error = new HttpException(
                    'удалите сначала товары на складе', 403
                )
                return {error}
            } else {
                oldWarehouse.image && deleteFile(oldWarehouse)
                return  await this.warehouseRepository.delete({id: warehouseId})
            }
        } catch (err) {
            console.log(err)
        }
    }
}