import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {User} from "./user/user.model";
import {UserModule} from "./user/user.module";
import {Role} from "./roles/role.model";
import {RoleModule} from "./roles/role.module";
import {UserRoles} from "./roles/user_roles.model";
import {AuthModule} from "./auth/auth.module";


@Module({
    controllers: [],
    providers: [],
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
            models: [User, Role, UserRoles],
            autoLoadModels: true
        }),
        UserModule, RoleModule, AuthModule
    ],
})


export class AppModule {
}