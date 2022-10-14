import {Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {WarehouseService} from "./warehouse.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateWarehouseDto} from "../Entitys/dto/warehouseDto";


@Controller('warehouse')


export class WarehouseController {

    constructor(private warehouseService: WarehouseService) {
    }

    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    createWareHouse(@Body() dto: CreateWarehouseDto,
                    @UploadedFile() image: Express.Multer.File) {
        console.log(image)
        console.log(dto)
        return this.warehouseService.createWarehouse(dto, image)
    }

    @Get('all/:id')
    getAllWarehouses(@Param() param) {
        console.log(param.id)
        return this.warehouseService.getAllWarehouses(param.id)

    }

    @Get('purchases/:id')
    async getWarehousePurchases(@Param() param) {
        const warehouse = await this.warehouseService.findWarehouseById(param.id)
        return warehouse.purchases
    }
    @Delete('delete/:id')
    deleteWarehouse(@Param() param){
        return this.warehouseService.deleteWarehouse(param.id)
    }

}