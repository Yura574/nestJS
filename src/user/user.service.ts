import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {CreateUserDto} from "./dto/create_user.dto";


@Injectable()

export class UserService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User
    ) {}
    async createUser (dto: CreateUserDto){
        const user = await this.userModel.create(dto)
        return user
    }
    async findAll(): Promise<User[]>{
        return  this.userModel.findAll()
    }
    async findOne(id: string): Promise<User>{
        return this.userModel.findOne({
            where: {
                id,
            }
        })
    }
    async remove(id: string): Promise<void>{
        const user = await this.findOne(id);
        await user.destroy()
    }
}