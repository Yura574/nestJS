import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Accounts} from "../Entitys/Accounts.entity";


@Injectable()
export class AccountsService {
    constructor(@InjectRepository(Accounts)
                    private accountsService: Repository<Accounts>) {
    }
}