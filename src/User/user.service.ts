import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserDto} from "../Entitys/dto/userDto";
import {RoleService} from "./Roles/role.service";
import {User} from "../Entitys";
import {AccountsService} from "../Accounts/Accounts.service";


@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
                private userRepository: Repository<User>,
                private roleService: RoleService,
                @Inject(forwardRef(() => AccountsService))
                private accountService: AccountsService
    ) {
    }

    async createUser(dto: UserDto) {
        const role = await this.roleService.getRoleByValue('admin')
        console.log('role', role)


        return await this.userRepository.save({...dto, role})
    }

    async deleteUser(id: number) {
        return await this.userRepository.delete({id})
    }

    getUsers() {
        return this.userRepository.find({relations: {role: true, warehouses: true}})
    }

    async findUserByEmail(email: string) {
        return await this.userRepository.findOne({
                relations: {role: true},
                where: {email}
            },
        )
    }

    async findUserById(id) {
       const user =  await this.userRepository.findOne({
            where: {
                id: +id
            },
            relations: {
                categories: true,
                role: true,
                warehouses: true,
                purchases: true,
                purchasesInfo: true,
                ledger: true,
                products: true,
                accounts: true
            },

        })
        // console.log(user.accounts)
        if(user.accounts.length === 0){
            await this.accountService.createAccounts(user.id, user)
        }
        return user

    }

    async refreshTokenUser(id: number, refreshToken: string) {
        return this.userRepository.update({id}, {refreshToken})
    }

    // async logout(userId: number) {
    //     return this.userRepository.update({id: userId}, {refreshToken: null})
    // }
    //
    // async validateUser(email: string, password: string) {
    //     const user = await this.userRepository.findOne({
    //         relations: {
    //             role: true
    //         },
    //         where: {
    //             email
    //         }
    //     })
    //     if (user && user.password === password) {
    //         const {password, ...result} = user
    //         return result
    //     }
    //     return null
    // }
    //
    // async findUserCategory(userID) {
    //     return await this.userRepository.findOne({
    //         where: {id: +userID}, relations: {
    //             categories: true
    //         }
    //     });
    // }

}