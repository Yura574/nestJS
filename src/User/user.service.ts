import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../Entity/user.entity";
import {Repository} from "typeorm";
import {UserDto} from "../dto/userDto";


@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {
    }

    async createUser(dto: UserDto) {
        const user = await this.userRepository.save(dto)
        console.log(user)
        return user
    }
    getUser(){
        return  this.userRepository.find()
    }
    async findOne(email: string): Promise<UserDto | undefined> {
        return this.userRepository.findOneBy({email});
    }
}