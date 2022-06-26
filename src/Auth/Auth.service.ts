import {Injectable} from "@nestjs/common";
import {PrismaService} from "../Prisma/Prisma.service";



@Injectable()

export class AuthService{

constructor(private prisma: PrismaService) {
}
    register(){
        return 'register successful'
    }

    login(){
        return 'login success'
    }
}