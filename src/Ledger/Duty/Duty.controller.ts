import {Controller} from "@nestjs/common";
import {DutyService} from "./Duty.service";


@Controller('duty')


export class DutyController {
    constructor(private dutyService: DutyService) {
    }
}