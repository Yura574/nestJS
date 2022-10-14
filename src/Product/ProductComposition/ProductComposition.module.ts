import {forwardRef, Module} from "@nestjs/common";
import {ProductCompositionController} from "./ProductComposition.controller";
import {ProductCompositionService} from "./ProductComposition.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductComposition} from "../../Entitys/productComposition.entity";
import {ProductModule} from "../Product.module";


@Module({
    controllers: [ProductCompositionController],
    providers: [ProductCompositionService],
    imports: [TypeOrmModule.forFeature([ProductComposition]),
        forwardRef(()=>ProductModule)],
    exports: [ProductCompositionService]
})

export class ProductCompositionModule{

}