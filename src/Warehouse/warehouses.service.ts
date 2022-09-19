import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Warehouse} from "../Entitys/warehouse.entity";


@Injectable()

export class WarehousesService {
    constructor(@InjectRepository(Warehouse)
                private warehouseRepository: Repository<Warehouse>  ) {
    }

    async createWarehouse (dto, image) {
        // return await this.warehouseRepository.save()
    }
}