import {Controller} from "@nestjs/common";
import {AccountsService} from "./Accounts.service";


@Controller()

export class AccountsController {
    constructor(private accountsService: AccountsService) {
    }
}