import {Module} from "@nestjs/common";
import {DeviceService} from "./device.service";
import {DeviceController} from "./device.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Device} from "../../Entitys";
import {FileModule} from "../../Files/file.module";


@Module({
    providers: [DeviceService],
    controllers: [DeviceController],
    imports:[TypeOrmModule.forFeature([Device]), FileModule]
})
export class DeviceModule{}