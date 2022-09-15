import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserDto} from "../Entitys/dto/userDto";
import {RoleService} from "./Roles/role.service";
import {User} from "../Entitys";
import {AuthService} from "../Auth/auth.service";


@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
                private userRepository: Repository<User>,
                private roleService: RoleService,
    ) {
    }

    async createUser(dto: UserDto) {
        const role = await this.roleService.getRoleByValue('admin')
        const user = await this.userRepository.save({...dto, role})
        return user
    }

    async deleteUser(id: number) {
        return await this.userRepository.delete({id})
    }

    getUsers() {
        return this.userRepository.find({relations: {role: true}})
    }

    async findUserByEmail(email: string) {
        return await this.userRepository.findOne({
                relations: {role: true},
                where: {email}
            },
        )
    }

    async findAllCategoriesByUser(id: number) {
       // const user = await this.userRepository.find({
       //      relations: {categories: true},
       //      where: {id}
       //  })
        const user = await this.findUserById(id)
        return user.categories
    }


    async findUserById(id) {
        return await this.userRepository.findOne({
            where: {
                id
            },
            relations: {categories: true, role: true}
        })

    }

    async refreshTokenUser(id: number, refreshToken: string) {
        return this.userRepository.update({id}, {refreshToken})
    }

    async logout(userId: number) {
        return this.userRepository.update({id: userId}, {refreshToken: null})
    }

    async validateUser(email: string, password: string) {
        const user = await this.userRepository.findOne({
            relations: {
                role: true
            },
            where: {
                email
            }
        })
        if (user && user.password === password) {
            const {password, ...result} = user
            return result
        }
        return null
    }

    async findUserCategory(userID) {
        console.log(userID)
        return await this.userRepository.findOne({
            where: {id: +userID}, relations: {
                categories: true
            }
        });
    }

}