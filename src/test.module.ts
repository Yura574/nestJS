import {Module} from "@nestjs/common";
import {SubCategoryModule} from "./SubCategory/subCategory.module";
import {TestEntity, TestService} from "./test.service";
import {GoodsController} from "./Goods/Goods.controller";
import {GoodsService} from "./Goods/Goods.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Goods} from "./Entitys/goods.entity";
import {FileModule} from "./Files/file.module";



@Module({
    providers: [TestService],
    imports:[TypeOrmModule.forFeature([TestEntity]),
        FileModule, SubCategoryModule],
    exports:[GoodsService]

})
export class Test{}