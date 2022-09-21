import {Body, Controller, Get, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {WarehouseService} from "./warehouse.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateWarehouseDto, GetAllWarehousesDto} from "../Entitys/dto/warehouseDto";


@Controller('warehouse')


export class WarehouseController {

    constructor(private warehouseService: WarehouseService) {
    }

    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    createWareHouse(@Body() dto: CreateWarehouseDto,
                    @UploadedFile() image: Express.Multer.File) {
        return this.warehouseService.createWarehouse(dto, image)
    }

    @Get('all')
    getAllWarehouses(@Body() dto: GetAllWarehousesDto){
        console.log(dto)
        return  this.warehouseService.getAllWarehouses(dto.userId)
    }

    // @Get('one')

}