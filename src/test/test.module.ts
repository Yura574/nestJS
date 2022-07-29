import {Module} from "@nestjs/common";
import {TestService} from "./test.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Goods} from "../Entitys/goods.entity";
import {SubCategoryModule} from "../SubCategory/subCategory.module";


@Module({
    providers:[TestService],
    imports:[TypeOrmModule.forFeature([Goods])]
})

export class TestModule{}