import {Module} from "@nestjs/common";
import {TypeController} from "./type.controller";
import {TypeService} from "./type.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Type} from "../Entitys";


@Module({
    controllers:[ TypeController],
    providers:[TypeService],
    imports:[TypeOrmModule.forFeature([Type])]
})

export class TypeModule{}