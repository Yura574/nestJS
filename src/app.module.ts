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
import {WarehouseModule} from "./Warehouse/warehouse.module";
import {PurchasesModule} from "./Purchases/Purchases.module";
import {PurchasesInfoModule} from "./Purchases/PurchasesInfo/PurchasesInfo.module";
import {ProductModule} from "./Product/Product.module";
import {ProductCompositionModule} from "./Product/ProductComposition/ProductComposition.module";
import {LedgerModule} from "./Ledger/Ledger.module";
import {InvestmentModule} from "./Ledger/Investment/Investment.module";
import {AccountsModule} from "./Accounts/Accounts.module";
import {LedgerCompositionModule} from "./Ledger/LedgerComposition/LedgerComposition.module";
import {DutyModule} from "./Ledger/Duty/Duty.module";
import {SubCategoryModule} from "./SubCategory/subCategory.module";

@Module({
    imports: [
        ConfigModule.forRoot({
           // envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: 'dpg-cf23fnpgp3jl0q117bfg-a',
            port: 5432,
            username: 'yura574',
            password: 'H00EtI32V944g5zDKunjXFJSzrfjFRxe',
            database: 'coplascadb_hbis',
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
        SubCategoryModule,
        ProductModule, ProductCompositionModule, WarehouseModule,
        PurchasesModule, PurchasesInfoModule, LedgerModule, InvestmentModule, AccountsModule, LedgerModule,
        LedgerCompositionModule, DutyModule

    ],
})
export class AppModule {
}
