import {Module} from "@nestjs/common";
import {ProductCompositionController} from "./ProductComposition.controller";
import {ProductCompositionService} from "./ProductComposition.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductComposition} from "../../Entitys/productComposition.entity";


@Module({
    controllers: [ProductCompositionController],
    providers: [ProductCompositionService],
    imports: [TypeOrmModule.forFeature([ProductComposition])]
})

export class ProductCompositionModule{

}