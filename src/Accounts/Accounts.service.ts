import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserService} from "../User/user.service";
import {Accounts} from "../Entitys/accounts.entity";


@Injectable()
export class AccountsService {
    constructor(@InjectRepository(Accounts)
                private accountsService: Repository<Accounts>,
                @Inject(forwardRef(() => UserService))
                private userService: UserService) {
    }

    async createAccounts(userId: number, user) {
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
        return await this.accountsService.findOne({where: {user: {id}}})
        // if (!accounts) {
        //     return await this.createAccounts(id)
        // }
        // return accounts

    }
    async getOne (id){
        return await this.accountsService.find({where:{user:{id}}})
    }

    async deleteAccounts(id: number) {
        return this.accountsService.delete({id})
    }

    async changeAccounts (dto){

    }
}