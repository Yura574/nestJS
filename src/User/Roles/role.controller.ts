import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {RoleService} from "./role.service";
import {CreateRoleDto} from "../../Entitys/dto/createRole.dto";


@Controller('role')
export class RoleController{
    constructor( private roleService: RoleService) {
    }

    @Post('create')
    createRole(@Body() dto: CreateRoleDto)  {
        return this.roleService.createRole(dto)
    }

    @Get('/:value')
    getRoleByValue(@Param('value') value: string){
        return this.roleService.getRoleByValue(value)
    }
}