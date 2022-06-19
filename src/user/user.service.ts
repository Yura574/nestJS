import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {CreateUserDto} from "./dto/create_user.dto";
import {RoleService} from "../roles/role.service";


@Injectable()

export class UserService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private roleModel: RoleService
    ) {
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.userModel.create(dto)
        const role = await this.roleModel.getRoleByValue('user')
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll({include: {all: true}})
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findOne({
            where: {
                id,
            }
        })
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy()
    }

    async getUserByEmail(email: string) {
        return await this.userModel.findOne({
            where: {email},
            include: {all: true}
        })
    }
}