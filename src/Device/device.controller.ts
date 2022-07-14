import {Body, Controller, Get, Post} from "@nestjs/common";
import {DeviceService} from "./device.service";
import {DeviceDto} from "../Entitys/dto/deviceDto";


@Controller('device')

export class DeviceController {
    constructor(private deviceService: DeviceService ) {
    }

    @Post()
    createDevice (@Body() dto:DeviceDto){
        return this.deviceService.createDevice(dto)
    }

    @Get()
    getAllDevices(){
        return this.deviceService.getAllDevices()
    }
}