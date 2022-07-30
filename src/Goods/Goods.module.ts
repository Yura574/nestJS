import {Module} from "@nestjs/common";
import {GoodsService} from "./Goods.service";
import {GoodsController} from "./Goods.controller";
import {SubCategoryModule} from "../SubCategory/subCategory.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Goods} from "../Entitys/goods.entity";
import {FileModule} from "../Files/file.module";

@Module({
    providers:[GoodsService],
    controllers:[GoodsController],
    imports:[TypeOrmModule.forFeature([Goods]),FileModule,
         SubCategoryModule]
})

export class GoodsModule{}