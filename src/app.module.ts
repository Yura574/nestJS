import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./User/user.module";
import {UserEntity} from "./Entity/user.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "unbiliever13",
            database: "Coplasca-store",
            entities: [UserEntity],
            synchronize: true,
            autoLoadEntities: true
        }),
        UserModule
    ],
})
export class AppModule {
}
