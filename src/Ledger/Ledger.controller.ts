import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
import {LedgerService} from "./Ledger.service";
import {sellJournalEntryDto} from "../Entitys/dto/ledgerDto";


@Controller('ledger')


export class LedgerController {
    constructor(private ledgerService: LedgerService) {
    }

    @Get('journalEntries/:id')
    getJournalEntries(@Param() param) {
        return this.ledgerService.getJournalEntries(param.id)
    }

    @Post('sell')
    sellJournalEntry (@Body() dto: sellJournalEntryDto){
        return this.ledgerService.sellJournalEntry(dto)
    }


    @Delete('deleteJournalEntry/:id')
    deleteJournalEntry (@Param() param){
        return this.ledgerService.deleteJournalEntry(param.id)
    }


}