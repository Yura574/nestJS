import {Controller} from "@nestjs/common";
import {InvestmentService} from "./Investment.service";


@Controller()

export class InvestmentController{
    constructor(private investmentService: InvestmentService) {
    }
}