import {Module} from "@nestjs/common";
import {LedgerCompositionController} from "./LedgerComposition.controller";
import {LedgerCompositionService} from "./LedgerComposition.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LedgerComposition} from "../../Entitys/ledgerComposition.entity";


@Module({
    controllers: [LedgerCompositionController],
    providers:[LedgerCompositionService],
    exports:[LedgerCompositionService],
    imports:[TypeOrmModule.forFeature([LedgerComposition])]
})

export class LedgerCompositionModule {}