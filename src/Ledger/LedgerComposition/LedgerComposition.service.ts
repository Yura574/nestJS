import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {LedgerComposition} from "../../Entitys/ledgerComposition.entity";
import {Repository} from "typeorm";


@Injectable()

export class LedgerCompositionService {
    constructor(@InjectRepository(LedgerComposition)
                    private ledgerRepository: Repository<LedgerComposition>) {
    }
}