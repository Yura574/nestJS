import {Body, Controller, Get, Param, Post, UploadedFile,  UseInterceptors} from "@nestjs/common";
import {DeviceService} from "./device.service";
import {DeviceDto} from "../../Entitys/dto/history/deviceDto";
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
        const folder = 'static'
        console.log(file)
        console.log(dto)
        return this.deviceService.createDevice(dto, file, folder )
        // {
        //     body,
        //     file: file.buffer.toString(),
        // };
    }
    @Post('uploadFile')
    @UseInterceptors(FileInterceptor('file'))

    upload(
        @Body() dto: DeviceDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        const folder = 'myDevice'
        console.log(file)
        return this.deviceService.createDevice(dto, file, folder)

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