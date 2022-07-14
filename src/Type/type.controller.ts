import {Body, Controller, Get, Post} from "@nestjs/common";
import {TypeService} from "./type.service";
import {TypeDto} from "../Entitys/dto/typeDto";


@Controller('type')
export class TypeController{
    constructor(private typeService: TypeService) {
    }

    @Post()
    createType (@Body() dto:TypeDto){
        return this.typeService.createType(dto)
    }

    @Get()
    getAllTypes(){
        return this.typeService.getAllType()
    }
}