import {Module} from "@nestjs/common";
import {AppController} from "./appController";
import {AppService} from "./appService";
import {SequelizeModule} from "@nestjs/sequelize";


@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'unbiliever13',
            database: 'test_db',
            models: [],
            autoLoadModels: true
        }),
    ],
})


export class AppModule {
}