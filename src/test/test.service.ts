import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Goods} from "../Entitys/goods.entity";
import {Repository} from "typeorm";
import {SubCategoryService} from "../SubCategory/subCategory.service";
import {Post} from "../Entitys";


@Injectable()

export class TestService {
    constructor(@InjectRepository(Post)
                private testRepository: Repository<Post>,
                private subCategoryService: SubCategoryService
    ) {
    }
}