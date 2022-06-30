import {Controller, Get, Req} from "@nestjs/common";
import {Request} from "express";


@Controller('users')


export class UserController{


    @Get()
    findAll(){
        return {name: 'Yura'}
    }
}