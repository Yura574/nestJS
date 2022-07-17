import {ForbiddenException, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {UserService} from "../User/user.service";
import {UserDto} from "../Entitys/dto/userDto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt'
import {JwtService} from "@nestjs/jwt";
import {Tokens} from "./auth.controller";
import {User} from "../Entitys";


@Injectable()
export class AuthService {
    constructor(@InjectRepository(User)
                private userRepository: Repository<User>,
                private userService: UserService,
                private jwt: JwtService) {
    }

    async singUp(dto: UserDto): Promise<Tokens> {
        const candidate = await this.userService.findUserByEmail(dto.email)
        if (candidate) {
            throw new HttpException('such user already exist', HttpStatus.BAD_REQUEST)
        }
        try {

            const hash = await bcrypt.hash(dto.password, 8)
            const user = await this.userService.createUser({...dto, password: hash})
            const tokens = await this.singToken(user)
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

    async singIn(dto: UserDto) {
        const user = await this.validateUser(dto)
        const tokens = await this.singToken(user)
        await this.updateToken(user.id, tokens.refresh_token)

        return {...tokens, user}
    }

    async authMe(token){
        const validToken = this.jwt.verify(token, {secret:process.env.SECRET_CODE || 'secret'} )
        const user = {...validToken}
        user.logo = 'assa'
        console.log(validToken)
        // console.log(user)
        return user
    }

    async logout(userId: number) {
        await  this.userService.logout(userId)
        return 'logout'
    }

    refreshToken() {

    }

    async singToken(user: User): Promise<Tokens> {
        const payload = {sub: user.id, email: user.email, role: user.role}
        const [jwt, refresh] = await Promise.all([
            this.jwt.signAsync(payload,
                {
                    expiresIn: 60 * 15,
                    secret: process.env.SECRET_CODE || 'secret',
                }),
            this.jwt.signAsync(payload,
                {
                    expiresIn: 60 * 60 * 24 * 7,
                    secret: process.env.SECRET_CODE || 'secret'
                })
        ])

        return {
            access_token: jwt,
            refresh_token: refresh
        }
    }

    async   updateToken(userId: number, refreshToken: string) {
        const hash = await bcrypt.hash(refreshToken, 8)
        await this.userService.refreshTokenUser(userId, hash)
    }

    private async validateUser(dto: UserDto) {
        const user = await this.userService.findUserByEmail(dto.email)
        if (!user) {
            throw new ForbiddenException('password or email incorrect')
        }
        const comparePassword = await bcrypt.compare(dto.password, user.password)
        if (!comparePassword) {
            throw new ForbiddenException('password or email incorrect')
        }
        return user;
    }


}