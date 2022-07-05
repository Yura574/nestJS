import {ForbiddenException, Injectable} from "@nestjs/common";
import {UserService} from "../User/user.service";
import {UserDto} from "../dto/userDto";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../Entity/user.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt'
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity)
                private userRepository: Repository<UserEntity>,
                private userService: UserService,
                private jwt: JwtService) {
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(email);
        if (user && user.password === pass) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async singUp(dto: UserDto) {
        try{
            const hash = await bcrypt.hash(dto.password, 8)
            const user = await  this.userService.createUser({...dto, password: hash})
            delete  user.password
            return user
        }catch (e) {
            console.log(e.code)
            if(e.code === '23505'){
                throw new ForbiddenException('such user already exist')
            }
            throw new ForbiddenException('some error')
        }

    }

    async singIn(dto: UserDto) {
        const user = await this.userRepository.findOneBy({
            email: dto.email
        })
        if(!user){
            throw new ForbiddenException('email incorrect')
        }
        const comparePassword = await bcrypt.compare(dto.password, user.password)
        if(!comparePassword){
            throw new ForbiddenException('password incorrect')
        }
        delete  user.password
        return this.singToken(user.email, user.id)
    }
    async singToken (email: string, userId: number){

        const payload = {
            sub: userId,
            email
        }
        return this.jwt.sign(payload, {
            expiresIn: "15m",
            secret: 'secret-code'
        })
    }

}