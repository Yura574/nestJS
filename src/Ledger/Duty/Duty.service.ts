import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Duty} from "../../Entitys/duty.entity";


@Injectable()

export class DutyService {
    constructor(@InjectRepository(Duty)
                    private ledgerRepository: Repository<Duty>) {
    }
}