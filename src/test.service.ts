import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Entity, PrimaryGeneratedColumn, Repository} from "typeorm";
import {SubCategoryService} from "./SubCategory/subCategory.service";


@Injectable()

@Entity()
export class TestEntity {
    @PrimaryGeneratedColumn()
    id: number
}
export class TestService {
    constructor(@InjectRepository(TestEntity)
                private testRepository: Repository<TestEntity>,
                private sub: SubCategoryService) {
    }


    async findSub () {
        return await this.sub.getOneSubCategory('lololo')
    }
}
