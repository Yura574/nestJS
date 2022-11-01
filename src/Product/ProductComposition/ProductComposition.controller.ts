import {Body, Controller, Post} from "@nestjs/common";
import {ProductCompositionService} from "./ProductComposition.service";
import {ProductCompositionDto} from "../../Entitys/dto/productCompositionDto";


@Controller('composition')

export class ProductCompositionController {
    constructor(private productCompositionService: ProductCompositionService) {
    }

    @Post('create')
    createComposition (@Body() dto: ProductCompositionDto){
        return this.productCompositionService.createProductComposition(dto)
    }

}