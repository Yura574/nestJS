import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DutyController} from "./Duty.controller";
import {DutyService} from "./Duty.service";
import {Duty} from "../../Entitys/duty.entity";


@Module({
    controllers: [DutyController],
    providers:[DutyService],
    exports:[DutyService],
    imports:[TypeOrmModule.forFeature([Duty])]
})

export class DutyModule {}