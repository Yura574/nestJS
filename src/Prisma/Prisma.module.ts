import { Module} from "@nestjs/common";
import {PrismaController} from "./Prisma.controller";
import {PrismaService} from "./Prisma.service";

@Module({
    controllers:[PrismaController],
    providers: [PrismaService],
    exports:[PrismaService]
    }

)

export class PrismaModule{}