import {Module} from "@nestjs/common";
import {InvestmentService} from "./Investment.service";
import {InvestmentController} from "./Investment.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Investment} from "../../Entitys/investment.entity";


@Module({
    providers:[InvestmentService],
    controllers:[InvestmentController],
    exports:[InvestmentService],
    imports:[TypeOrmModule.forFeature([Investment])]
})

export class InvestmentModule{}