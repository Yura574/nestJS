import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./User/user.module";
import {UserEntity} from "./Entity/user.entity";
import {AuthModule} from "./Auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.HOST,
            port: Number(process.env.PORT),
            username: 'postgres',
            password: 'unbiliever13',
            database: 'Coplasca-store',
            entities: [UserEntity],
            synchronize: true,
            autoLoadEntities: true,
        }),
        UserModule, AuthModule
    ],
})
export class AppModule {
}
