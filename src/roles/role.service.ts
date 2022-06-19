import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./role.model";
import {CreateRoleDto} from "./dtoRole/dtoRole.dto";


@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Role)
        private userRole: typeof Role
    ) {
    }

    async createRole(dto: CreateRoleDto) {
        return await this.userRole.create(dto)
    }

    async getRoleByValue(value: string) {
        return await this.userRole.findOne({where: {value}})

    }
}