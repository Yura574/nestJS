import {Body, Controller, Get, Post} from "@nestjs/common";
import {BrandService} from "./brand.service";
import {BrandDto} from "../Entitys/dto/brandDto";


@Controller('brand')

export class BrandController {
    constructor(private brandService: BrandService) {
    }

    @Post()
    createBrand(@Body() dto:BrandDto) {
        return this.brandService.createBrand(dto)
    }

    @Get()
    getAllBrands(){
        return this.brandService.getAllBrands()
    }
}