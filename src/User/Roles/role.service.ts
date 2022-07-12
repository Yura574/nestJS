import {Injectable} from "@nestjs/common";
import {CreateRoleDto} from "../../Entity/dto/createRole.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Role} from "../../Entity/role.entity";


@Injectable()

export class RoleService {
    constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {
    }

    async createRole(dto: CreateRoleDto) {
        return await this.roleRepository.save(dto)
    }

    async getRoleByValue(value: string) {
        return await this.roleRepository.findOneBy({value})
    }
}