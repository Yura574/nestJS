import {Injectable} from "@nestjs/common";
import {PrismaService} from "../Prisma/Prisma.service";
import * as argon from "argon2";



@Injectable()

export class AuthService{

constructor(private prisma: PrismaService) {
}
   async register(authDto){
        //generate the password hash
        const hash = await argon.hash(authDto.password)
        //save the new user in the db
        const newUser = await this.prisma.user.create({
            data:{
                email: authDto.email,
                password: hash
            },
            select:{
                id: true,
                email: true,
                createdAt: true
            }

        })
        //return the saved user

        return newUser
    }

    login(){
        return 'login success'
    }
}