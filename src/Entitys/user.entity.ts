import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "./role.entity";
import {Category} from "./category.entity";
import {Warehouse} from "./warehouse.entity";
import {Purchases} from "./Purchases.entity";
import {PurchasesInfo} from "./PurchasesInfo.entity";
import {Ledger} from "./ledger.entity";
import {Products} from "./products.entity";
import {Accounts} from "./Accounts.entity";


@Entity()

export class User {
    @ApiProperty({example: 1, description: 'id пользователя'})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: 'Yura', description: 'имя пользователя'})
    @Column({nullable: true})
    name: string


    @ApiProperty({example: 'lololo@gmail.com', description: 'email пользователя'})
    @Column({unique: true})
    email: string

    @ApiProperty({example: 'lololo123', description: 'пароль пользователя'})
    @Column()
    password: string


    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3O', description: 'refresh token'})
    @Column({nullable: true})
    refreshToken: string

    @ApiProperty({example: '2022-07-07 18:33:09.169715', description: 'дата создания'})
    @CreateDateColumn({type: "timestamptz", default: () => 'CURRENT_TIMESTAMP'})
    created: Date

    @ApiProperty({example: '2022-07-07 18:33:09.169715', description: 'дата обновления'})
    @UpdateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    updated: Date


    @ManyToOne(() => Role, (role) => role.user)
    @JoinColumn()
    role: Role

    @OneToMany(() => Category, (category) => category.user)
    categories: Category[]

    @OneToMany(() => Warehouse, (warehouse) => warehouse.user)
    warehouses: Warehouse[]

    @OneToMany(() => Purchases, (purchases) => purchases.user)
    purchases: Purchases[]

    @OneToMany(() => PurchasesInfo, (purchasesInfo) => purchasesInfo.user)
    purchasesInfo: PurchasesInfo[]

    @OneToMany(() => Ledger, (ledger) => ledger.user)
    ledger: Ledger[]

    @OneToMany(() => Products, (products) => products.user)
    products: Products[]

    @OneToMany(()=> Accounts, (accounts)=> accounts.user)
    accounts: Accounts[]
}