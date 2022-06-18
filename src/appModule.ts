import {Module} from "@nestjs/common";
import {AppController} from "./appController";
import {AppService} from "./appService";
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {AuthController} from "./auth/auth.controller";
import {AuthService} from "./auth/auth.service";
import {User} from "./user/user.model";


@Module({
    controllers: [AppController, AuthController],
    providers: [AppService, AuthService],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
            }
        ),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            models: [User],
            autoLoadModels: true
        }),
    ],
})


export class AppModule {
}