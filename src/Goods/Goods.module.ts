import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Goods} from "../Entitys/goods.entity";
import {FileModule} from "../Files/file.module";
import {GoodsController} from "./Goods.controller";
import {GoodsService} from "./Goods.service";
import {CategoryModule} from "../Category/category.module";
import {SubCategoryService} from "../SubCategory/subCategory.service";
import {SubCategoryModule} from "../SubCategory/subCategory.module";


@Module({
    providers:[GoodsService],
    controllers:[GoodsController],
    imports:[TypeOrmModule.forFeature([Goods]),
    FileModule,  SubCategoryModule]
})

export class GoodsModule{}