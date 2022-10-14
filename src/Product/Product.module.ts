import {Module} from "@nestjs/common";
import {SubCategoryModule} from "../SubCategory/subCategory.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FileModule} from "../Files/file.module";
import {ProductService} from "./Product.service";
import {ProductController} from "./Product.controller";
import {Products} from "../Entitys/products.entity";

@Module({
    providers:[ProductService],
    controllers:[ProductController],
    imports:[TypeOrmModule.forFeature([Products]),FileModule,
         SubCategoryModule]
})

export class ProductModule {}