import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Investment} from "../../Entitys/investment.entity";
import {Repository} from "typeorm";


@Injectable()
export class InvestmentService {
    constructor(@InjectRepository(Investment)
                    private investmentService: Repository<Investment>) {
    }
}