import {Module} from "@nestjs/common";
import {UserModule} from "./User/User.module";
import {AuthModule} from "./Auth/Auth.module";
import {PrismaModule} from "./Prisma/Prisma.module";


@Module({
    imports:[UserModule, AuthModule, PrismaModule],
})

export class AppModule{}