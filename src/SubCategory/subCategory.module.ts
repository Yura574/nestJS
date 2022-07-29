import {Module} from "@nestjs/common";
import {SubCategoryController} from "./SubCategory.controller";
import {SubCategoryService} from "./SubCategory.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SubCategory} from "../Entitys/subCategory";
import {FileModule} from "../Files/file.module";
import {CategoryModule} from "../Category/category.module";


@Module({
    controllers: [SubCategoryController],
    providers:[SubCategoryService],
    imports: [TypeOrmModule.forFeature([SubCategory]),
        FileModule, CategoryModule],
    exports: [SubCategoryService]
})
export  class SubCategoryModule{}