import {Module} from "@nestjs/common";
import {BrandController} from "./brand.controller";
import {BrandService} from "./brand.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Brand} from "../Entitys";


@Module({
    controllers:[BrandController],
    providers:[BrandService],
    imports:[TypeOrmModule.forFeature([Brand])]
})

export class BrandModule{}