import {Module} from "@nestjs/common";
import {AuthController} from "./Auth.controller";
import {AuthService} from "./Auth.service";
import {PrismaModule} from "../Prisma/Prisma.module";


@Module({
    controllers:[AuthController],
    providers:[AuthService],
    imports:[PrismaModule]
})


export class AuthModule{}