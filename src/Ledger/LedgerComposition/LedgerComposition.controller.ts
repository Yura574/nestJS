import {Controller} from "@nestjs/common";
import {LedgerCompositionService} from "./LedgerComposition.service";


@Controller('ledgerComposition')


export class LedgerCompositionController {
    constructor(private ledgerCompositionService: LedgerCompositionService) {
    }
}