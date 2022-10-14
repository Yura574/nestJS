import {Controller} from "@nestjs/common";
import {ProductCompositionService} from "./ProductComposition.service";


@Controller()

export class ProductCompositionController {
    constructor(private productCompositionService: ProductCompositionService) {
    }
}