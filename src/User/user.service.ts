import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserDto} from "../Entitys/dto/userDto";
import {User} from "../Entitys/user.entity";
import {RoleService} from "./Roles/role.service";


@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
                private userRepository: Repository<User>,
                private roleService: RoleService) {
    }

    async createUser(dto: UserDto) {
        const user = await this.userRepository.save(dto)
        const role = await this.roleService.getRoleByValue('user')

        user.role = [role]
        // await this.dataSource.manager.save(user)
        await this.userRepository.save(user)
        console.log(user)
        return user
    }

    getUsers() {
        return this.userRepository.find({

            relations: {
                role: true
            }

        })
    }

    async findUserByEmail(email: string) {
        console.log(email)
        const user = await this.userRepository.findOne({
                relations: {
                    role: true
                },
                where: {
                    email
                }
            },
        );
        console.log(user)
        return user
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
}