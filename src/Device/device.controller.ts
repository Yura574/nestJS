import {Body, Controller, Get, Param, Post, UploadedFile,  UseInterceptors} from "@nestjs/common";
import {DeviceService} from "./device.service";
import {DeviceDto} from "../Entitys/dto/deviceDto";
import {FileInterceptor} from "@nestjs/platform-express";


@Controller('device')

export class DeviceController {
    constructor(private deviceService: DeviceService ) {
    }

    // @Post()
    // createDevice (@Body() dto:DeviceDto){
    //     return this.deviceService.createDevice(dto)
    // }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))

    uploadFile(
        @Body() dto: DeviceDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        console.log(file)
        return this.deviceService.createDevice(dto, file )
        // {
        //     body,
        //     file: file.buffer.toString(),
        // };
    }
    @Post('upload-file')
    @UseInterceptors(FileInterceptor('file'))

    upload(
        @Body() dto: DeviceDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        console.log(file)
        return this.deviceService.createDevice(dto, file )
        // {
        //     body,
        //     file: file.buffer.toString(),
        // };
    }
    getImage(){

    }

    @Get()
    getAllDevices(){
        return this.deviceService.getAllDevices()
    }

    @Get(":id")
    getOneDevice(@Param() params){
return  this.deviceService.getOneDevice(params.id)
    }
}