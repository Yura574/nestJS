import {HttpException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Accounts} from "../Entitys/Accounts.entity";
import {UserService} from "../User/user.service";


@Injectable()
export class AccountsService {
    constructor(@InjectRepository(Accounts)
                private accountsService: Repository<Accounts>,
                private userService: UserService) {
    }

    async createAccounts(userId: number) {
        const user = await this.userService.findUserById(userId)
        // if (!user) {
        //     const error = new HttpException('user not found', 403)
        //     return {error}
        // }
        const newAccounts = await this.accountsService.save({id: userId, user})

        delete newAccounts.user
        return newAccounts
    }

    async updateAccounts(dto) {
        const {userId, primeCost, profit, investment, duty} = dto
        const accounts = await this.accountsService.findOne({where: {user: {id: userId}}})
        return await this.accountsService.update({id: accounts.id}, {
            primeCost,
            profit,
            investment,
            duty
        })
    }

    async getAccounts(id: number) {
        const accounts = await this.accountsService.findOne({where: {user: {id}}})
        if (!accounts) {
            return await this.createAccounts(id)
        }
        return accounts

    }

    async deleteAccounts(id: number) {
        return this.accountsService.delete({id})
    }
}