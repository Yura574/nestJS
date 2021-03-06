import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserDto} from "../Entitys/dto/userDto";
import {RoleService} from "./Roles/role.service";
import {User} from "../Entitys";


@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
                private userRepository: Repository<User>,
                private roleService: RoleService,) {
    }

    async createUser(dto: UserDto) {
        const role = await this.roleService.getRoleByValue('admin')
        return await this.userRepository.save({...dto, role})

    }

    async deleteUser(id: number) {
        return await this.userRepository.createQueryBuilder().delete().from(User)
            .where("id = :id", {id})
            .execute()
    }

    getUsers() {
        return this.userRepository.find({

            relations: {
                role: true
            }

        })
    }

    async findUserByEmail(email: string) {
        return await this.userRepository.findOne({
                relations: {
                    role: true
                },
                where: {
                    email
                }
            },
        )
    }

    async findUserById(id) {
        return await this.userRepository.findOne({
            where: {
                id
            }
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
        return await this.userRepository.findOne({where: {id: +userID}, relations: {
            categories: true
            }});
    }

}