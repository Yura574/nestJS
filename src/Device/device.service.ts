import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Device} from "../Entitys";
import {Repository} from "typeorm";
import {DeviceDto} from "../Entitys/dto/deviceDto";


@Injectable()

export class DeviceService {
    constructor(@InjectRepository(Device) private deviceRepository:  Repository<Device>) {
    }
   async createDevice (dto: DeviceDto){
        return  await this.deviceRepository.save(dto)
    }

    getAllDevices(){
        return this.deviceRepository.find()
    }
}