import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Brand} from "../../Entitys";
import {Repository} from "typeorm";
import {BrandDto} from "../../Entitys/dto/history/brandDto";


@Injectable()

export class BrandService{
    constructor(@InjectRepository(Brand)
                private brandRepository:  Repository<Brand>) {
    }

  async  createBrand(dto: BrandDto){
      return await this.brandRepository.save(dto)
    }

    getAllBrands(){
        return this.brandRepository.find()
    }
}