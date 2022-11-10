import {IsNotEmpty, IsNumber, IsString} from "class-validator";


export class LedgerDto {

    @IsNotEmpty()
    @IsNumber()
    id: number

    @IsString()
    title: string

    @IsString()
    operation: string

    @IsNumber()
    price: number

    @IsNumber()
    priceUnit: number

}

export class sellJournalEntryDto {

    @IsNotEmpty()
    userId: number

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    operation: string

    @IsNotEmpty()
    count: number


    @IsNotEmpty()
    price: number

    @IsNotEmpty()
    primeCost: number

    @IsNotEmpty()
    data: string



}
