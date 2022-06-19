import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    } from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles_auth.decorator";


@Injectable()
export class RolesGuards implements CanActivate{

    constructor(private jwtService: JwtService,
                private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY,[
                context.getHandler(),
                context.getClass()
            ] )
            if(!requiredRoles){
                return true
            }
            const req = context.switchToHttp().getRequest()
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token  = authHeader.split(' ')[1]
            if(bearer !=='Bearer' || !token){
                throw new HttpException('not access', HttpStatus.FORBIDDEN)
            }
            const user = this.jwtService.verify(token)
            req.user = user
            return user.roles.some(role=> requiredRoles.includes(role.value))
        } catch (e) {
            throw new HttpException('not access', HttpStatus.FORBIDDEN)
        }
    }

}