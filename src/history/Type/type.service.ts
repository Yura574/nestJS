import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Type} from "../../Entitys";
import {Repository} from "typeorm";
import {TypeDto} from "../../Entitys/dto/history/typeDto";


@Injectable()
export class TypeService {
    constructor(@InjectRepository(Type) private typeRepository:  Repository<Type>) {
    }

   async createType(dto: TypeDto){
        return await this.typeRepository.save(dto)
    }

    getAllType(){
        return this.typeRepository.find()
    }
}