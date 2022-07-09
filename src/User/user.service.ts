import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import { Repository} from "typeorm";
import {UserDto} from "../dto/userDto";
import {User} from "../Entity/user.entity";
import {RoleService} from "./Roles/role.service";


@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
                private userRepository: Repository<User>,
                private roleService: RoleService) {
    }

    async createUser(dto: UserDto) {
        const user = await this.userRepository.save(dto)
        const role = await this.roleService.getRoleByValue('admin')

        console.log(role)
        user.role = [role]
        console.log(user)
        // await this.dataSource.manager.save(user)
        await this.userRepository.save(user)
        console.log(role)

        return user
    }

    getUsers() {
        return this.userRepository.find({

           relations: {
               role: true
           }

        })
    }

    async findOne(email: string): Promise<UserDto | undefined> {
        return this.userRepository.findOneBy({email});
    }

    async refreshTokenUser(id: string, refresh: string) {
        return this.userRepository.update({
                id
            },
            {
                refreshToken: refresh
            })
    }
}