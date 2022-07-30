import {Module} from "@nestjs/common";
import {CategoryController} from "./category.controller";
import {CategoryService} from "./category.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FileModule} from "../Files/file.module";
import {UserModule} from "../User/user.module";
import {Category} from "../Entitys/category.entity";


@Module({
    controllers: [CategoryController],
    providers: [CategoryService],
    imports:[TypeOrmModule.forFeature([Category]),
    FileModule, UserModule],
    exports:[CategoryService]
})
export class CategoryModule{}