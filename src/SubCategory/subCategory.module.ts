import {SubCategoryController} from "./subCategory.controller";
import {SubCategoryService} from "./subCategory.service";
import {SubCategory} from "../Entitys/subCategory.entity";
import {FileModule} from "../Files/file.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {CategoryModule} from "../Category/category.module";

@Module({
    controllers: [SubCategoryController],
    providers: [SubCategoryService],
    imports:[TypeOrmModule.forFeature([SubCategory]),
        FileModule, CategoryModule],
    exports:[SubCategoryService]
})

export  class SubCategoryModule{}