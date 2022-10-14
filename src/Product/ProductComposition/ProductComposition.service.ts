import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductComposition} from "../../Entitys/productComposition.entity";
import {Repository} from "typeorm";


@Injectable()

export class ProductCompositionService {
    constructor(@InjectRepository(ProductComposition)
    private productCompositionRepository: Repository<ProductComposition>) {
    }
}