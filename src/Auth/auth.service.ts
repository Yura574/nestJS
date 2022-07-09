import {ForbiddenException, Injectable} from "@nestjs/common";
import {UserService} from "../User/user.service";
import {UserDto} from "../dto/userDto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt'
import {JwtService} from "@nestjs/jwt";
import {Tokens} from "./auth.controller";
import {User} from "../Entity/user.entity";


@Injectable()
export class AuthService {
    constructor(@InjectRepository(User)
                private userRepository: Repository<User>,
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

    async singUp(dto: UserDto): Promise<Tokens> {
        try {
            const hash = await bcrypt.hash(dto.password, 8)
            const user = await this.userService.createUser({...dto, password: hash})
            delete user.password
            const tokens = await this.singToken(user.email, user.id)
            await this.updateToken(user.id, tokens.refresh_token)
            return tokens
        } catch (e) {
            console.log(e.code)
            if (e.code === '23505') {
                throw new ForbiddenException('such user already exist')
            }
            throw new ForbiddenException('some error')
        }

    }

    async singIn(dto: UserDto): Promise<Tokens> {
        const user = await this.userRepository.findOneBy({
            email: dto.email
        })
        if (!user) {
            throw new ForbiddenException('email incorrect')
        }
        const comparePassword = await bcrypt.compare(dto.password, user.password)
        if (!comparePassword) {
            throw new ForbiddenException('password incorrect')
        }

        const tokens = await this.singToken(user.email, user.id)
        await this.updateToken(user.id, tokens.refresh_token)
        return tokens
    }

    logout() {
        return 'logout'
    }

    refreshToken() {

    }

    async singToken(email: string, userId: string) {
        const [jwt, refresh] = await Promise.all([
            this.jwt.signAsync({
                    sub: userId,
                    email
                },
                {
                    expiresIn: 60 * 15,
                    secret: 'secret-code'
                }),
            this.jwt.signAsync({

                    sub: userId,
                    email
                },
                {
                    expiresIn: 60 * 60 * 24 * 7,
                    secret: 'secret-code'
                })
        ])

        return {
            access_token: jwt,
            refresh_token: refresh
        }
    }

    async updateToken(userId: string, refresh: string) {
        const hash = await bcrypt.hash(refresh, 8)
        await this.userService.refreshTokenUser(userId, hash)
    }


}