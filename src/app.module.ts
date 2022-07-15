import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./User/user.module";
import {AuthModule} from "./Auth/auth.module";
import {ConfigModule} from "@nestjs/config";
import {RoleModule} from "./User/Roles/role.module";
import {FileModule} from "./Files/file.module";
import {PostModule} from "./Post/post.module";
import {Basket, BasketDevice, Brand, Device, DeviceInfo, Post, Rating, Role, Type, User} from "./Entitys";
import {DeviceModule} from "./Device/device.module";
import {TypeModule} from "./Type/type.module";
import {BrandModule} from "./Brand/brand.module";
import {MulterModule} from "@nestjs/platform-express";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";

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
            entities: [User, Role, Post, Basket, BasketDevice,Brand, Device, DeviceInfo,
            Rating, Type],
            synchronize: true,
            autoLoadEntities: true,

        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname,'static')
        }),
        MulterModule.register({
           dest: './upload'
        }),
        UserModule, AuthModule, RoleModule, FileModule, PostModule, DeviceModule, TypeModule, BrandModule
    ],
})
export class AppModule {
}
