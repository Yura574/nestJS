import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {CreateUserDto} from "../user/dto/create_user.dto";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {User} from "../user/user.model";


@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private jwtService: JwtService) {
    }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        // const comparePassword = await bcrypt.compare(userDto.password, user.password )
        return await this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('user already exist', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 6)

        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    async generateToken(user: User) {
        const {firstName, lastName, email, roles, id} = user
        const payload = {
            firstName,
            lastName,
            email,
            roles,
            id
        }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
        const comparePassword = await bcrypt.compare(userDto.password, user.password)
        if (user && comparePassword) {
            return user
        }
        throw new UnauthorizedException({message: 'very bad'})

    }
}