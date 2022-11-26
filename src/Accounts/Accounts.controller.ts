import {Controller, Delete, Get, Param} from "@nestjs/common";
import {AccountsService} from "./Accounts.service";


@Controller('accounts')

export class AccountsController {
    constructor(private accountsService: AccountsService) {
    }

    async create() {

    }

    @Get('get/:id')
    getAccounts(@Param() param) {
        return this.accountsService.getAccounts(param.id)
    }
    @Get('one/:id')
    getOne(@Param() param) {
        return this.accountsService.getOne(param.id)
    }

    @Delete('delete/:id')
        deleteAccounts(@Param() param){
        return this.accountsService.deleteAccounts(param.id)

    }
}