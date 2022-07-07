import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./User/user.module";
import {UserEntity} from "./Entity/user.entity";
import {AuthModule} from "./Auth/auth.module";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
           envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [UserEntity],
            synchronize: true,
            autoLoadEntities: true,

        }),
        UserModule, AuthModule
    ],
})
export class AppModule {
}
