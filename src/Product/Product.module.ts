import {forwardRef, Module} from "@nestjs/common";
import {SubCategoryModule} from "../SubCategory/subCategory.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FileModule} from "../Files/file.module";
import {ProductService} from "./Product.service";
import {ProductController} from "./Product.controller";
import {Products} from "../Entitys/products.entity";
import {ProductCompositionModule} from "./ProductComposition/ProductComposition.module";
import {UserModule} from "../User/user.module";
import {WarehouseModule} from "../Warehouse/warehouse.module";
import {PurchasesModule} from "../Purchases/Purchases.module";
import {AccountsModule} from "../Accounts/Accounts.module";
import {LedgerModule} from "../Ledger/Ledger.module";

@Module({
    providers: [ProductService],
    controllers: [ProductController],
    imports: [TypeOrmModule.forFeature([Products]), FileModule, SubCategoryModule,
        forwardRef(() => ProductCompositionModule),
        forwardRef(() => LedgerModule), UserModule, WarehouseModule,
        PurchasesModule, AccountsModule ],
    exports: [ProductService]
})

export class ProductModule {
}