import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./User/user.module";
import {AuthModule} from "./Auth/auth.module";
import {ConfigModule} from "@nestjs/config";
import {RoleModule} from "./User/Roles/role.module";
import {FileModule} from "./Files/file.module";
import {MulterModule} from "@nestjs/platform-express";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";
import {CategoryModule} from "./Category/category.module";
import {SubCategoryModule} from "./SubCategory/SubCategory.module";
import {GoodsModule} from "./Goods/Goods.module";
import {WarehouseModule} from "./Warehouse/warehouse.module";
import {PurchasesModule} from "./Purchases/Purchases.module";

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
            entities: ["src/entity/**/*.ts"],
            synchronize: true,
            autoLoadEntities: true,

        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname,'static'),
        }),
        MulterModule.register({
           dest: './upload'
        }),
        UserModule, AuthModule, RoleModule, FileModule, CategoryModule,
        SubCategoryModule, GoodsModule, WarehouseModule, PurchasesModule

    ],
})
export class AppModule {
}
