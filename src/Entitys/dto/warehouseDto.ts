import {IsNotEmpty, IsString} from "class-validator";


export class CreateWarehouseDto{

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    userId: number
}

export class GetAllWarehousesDto {
    @IsNotEmpty()
    userId: number
}