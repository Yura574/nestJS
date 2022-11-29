import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
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
    @Put('changeAccounts')
    changeAccounts(@Body() dto){
        console.log(dto)
        return this.accountsService.changeAccounts(dto)
    }

    @Delete('delete/:id')
        deleteAccounts(@Param() param){
        return this.accountsService.deleteAccounts(param.id)
    }
}