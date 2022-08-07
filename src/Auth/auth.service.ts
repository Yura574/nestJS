import {ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
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
                private jwt: JwtService,
    ) {
    }

    async singUp(dto: UserDto) {
        try {
            const candidate = await this.userService.findUserByEmail(dto.email)
            if (candidate) {
                // console.log('error')
                throw new ForbiddenException('such user already exist')
            }
            const hash = await bcrypt.hash(dto.password, 8)
            const user = await this.userService.createUser({...dto, password: hash})
            const tokens = await this.singToken(user)
            user.refreshToken = tokens.refresh_token
            await this.userService.refreshTokenUser(user.id, tokens.refresh_token)
            const userData = {...tokens, user}
            return userData
        } catch (e) {
            if (e.code === '23505') {
                throw new ForbiddenException('such user already exist')

            }
            throw new ForbiddenException('such user already exist')

        }
    }

    async singIn(dto: UserDto) {
        try {
            const user = await this.validateUser(dto)
            const tokens = await this.singToken(user)
            await this.updateToken(user.id, tokens.refresh_token)
            return {...tokens, user}
        } catch (e) {
            console.log(e)
        }
    }

    async authMe(token) {
        try {
            const validToken = this.jwt.verify(token, {secret: process.env.SECRET_CODE || 'secret'})
            const user = await this.userRepository.findOne({where: {email: validToken.email}, relations: {role: true}})
            const tokens = await this.singToken(user)
            await this.updateToken(user.id, tokens.refresh_token)
            return {...tokens, user}
        } catch (e) {
            console.log(e)
            throw new UnauthorizedException('invalid token')
        }
    }

    async logout(token) {
        try {
            const validToken = this.jwt.verify(token, {secret: process.env.SECRET_CODE || 'secret'})
            const user = await this.userRepository.findOne({where: {email: validToken.email}, relations: {role: true}})
            console.log(user)
        } catch (e) {
            console.log(e)
        }


        return 'updatedUser'

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

    async updateToken(userId: number, refreshToken: string) {
        console.log(refreshToken)
        // const hash = await bcrypt.hash(refreshToken, 8)
        await this.userService.refreshTokenUser(userId, refreshToken)
    }

    private async validateUser(dto: UserDto) {
        try {
            const user = await this.userService.findUserByEmail(dto.email)
            if (!user) {
                throw new ForbiddenException('password or email incorrect')
            }
            const comparePassword = await bcrypt.compare(dto.password, user.password)
            if (!comparePassword) {
                throw new ForbiddenException('password or email incorrect')
            }
            return user;
        } catch (e) {
            console.log(e)
            throw new ForbiddenException('password or email incorrect')
        }
    }


}