import {ForbiddenException, Injectable} from "@nestjs/common";
import {PrismaService} from "../Prisma/Prisma.service";
import * as argon from "argon2";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";



@Injectable()

export class AuthService{

constructor(private prisma: PrismaService) {
}
   async register(authDto){
        //generate the password hash
        const hash = await argon.hash(authDto.password)
        //save the new user in the db
       try{
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
       }catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException(
                        'this email already exists'
                    )
                    // return 'this email already exists'
                }
            }
            throw error
       }

    }

    login(){
        return 'login success'
    }
}