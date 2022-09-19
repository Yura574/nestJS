import {Body, Controller, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {WarehousesService} from "./warehouses.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {WarehouseDto} from "../Entitys/dto/warehouseDto";


@Controller()


export class WarehouseController {

    constructor(private warehouseService: WarehousesService) {
    }

    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    createWareHouse(@Body() dto: WarehouseDto,
                    @UploadedFile() image: Express.Multer.File) {
        return this.warehouseService.createWarehouse(dto, image)

    }

}