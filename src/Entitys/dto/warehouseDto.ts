import {IsNotEmpty, IsString} from "class-validator";


export class WarehouseDto{

    @IsNotEmpty()
    @IsString()
    title: string

}