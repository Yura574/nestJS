import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./User/user.module";
import {AuthModule} from "./Auth/auth.module";
import {ConfigModule} from "@nestjs/config";
import {User} from "./Entity/user.entity";
import {Role} from "./Entity/role.entity";
import {RoleModule} from "./User/Roles/role.module";
import {Post} from "./Entity/post.entity";
import {FileModule} from "./Files/file.module";
import {PostModule} from "./Post/post.module";
import {Basket} from "./Entity/basket.entity";
import {BasketDevice} from "./Entity/BasketDevice.entity";

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
            // entities: [User, Role, Post, Basket, BasketDevice],
            entities: ["dist/**/*.entity.js"],
            synchronize: true,
            autoLoadEntities: true,

        }),
        UserModule, AuthModule, RoleModule, FileModule, PostModule
    ],
})
export class AppModule {
}
