import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from "@nestjs/common";
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

        return this.warehouseService.createWarehouse(dto, image)
    }

    @Put('update')
    @UseInterceptors(FileInterceptor('image'))
    updateWarehouse(@Body() dto,
                    @UploadedFile() image: Express.Multer.File){

        return this.warehouseService.updatedWarehouse(dto, image)
    }

    @Get('all/:id')
    getAllWarehouses(@Param() param) {
        console.log(1)
        return this.warehouseService.getAllWarehouses(param.id)

    }

    @Get('purchases/:id')
    async getWarehousePurchases(@Param() param) {
        console.log(1)
        const warehouse = await this.warehouseService.findWarehouseById(param.id)
        return warehouse.purchases
    }
    @Delete('delete/:id')
    deleteWarehouse(@Param() param){
        return this.warehouseService.deleteWarehouse(param.id)
    }

}