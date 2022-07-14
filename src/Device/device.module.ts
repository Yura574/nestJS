import {Module} from "@nestjs/common";
import {DeviceService} from "./device.service";
import {DeviceController} from "./device.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Device} from "../Entitys";


@Module({
    providers: [DeviceService],
    controllers: [DeviceController],
    imports:[TypeOrmModule.forFeature([Device])]
})
export class DeviceModule{}