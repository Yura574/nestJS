import {BadRequestException, ForbiddenException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Warehouse} from "../Entitys/warehouse.entity";
import {FileService} from "../Files/file.service";
import {UserService} from "../User/user.service";
import {CreateWarehouseDto} from "../Entitys/dto/warehouseDto";


@Injectable()

export class WarehousesService {
    constructor(@InjectRepository(Warehouse)
                private warehouseRepository: Repository<Warehouse>,
                private fileService: FileService,
                private  userService: UserService) {
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
            const isExist = allWarehouse.filter(warehouse => warehouse.title === title)
            if(isExist.length> 0){
                const error = new ForbiddenException(BadRequestException, 'such warehouse already exist')
                return {error}
            }
            console.log(isExist)
            if (!image) {
                const newWarehouse = await this.warehouseRepository.save({title})
                newWarehouse.user = await this.userService.findUserById(userId)
                return await this.warehouseRepository.save(newWarehouse)
            }
            const fileName = await this.fileService.createFile(image, 'warehouse/')
            const newWarehouse = await this.warehouseRepository.save({title, image: fileName})
            newWarehouse.user = await this.userService.findUserById(userId)
            return await this.warehouseRepository.save(newWarehouse)
        }
        catch (err) {
            console.log(err)
        }

    }

    async getAllWarehouses (userId: number) {
        const user = await this.userService.findUserById(userId)
        return user.warehouses
    }
}