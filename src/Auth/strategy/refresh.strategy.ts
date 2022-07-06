import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Injectable} from "@nestjs/common";
import {Request} from "express";


@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "secret-code",
            passReqToCallback: true
        });
    }

    validate(req: Request, payload: any) {
        const refreshToken = req.get('authorization').replace('Baerer', '').trim()

        return {
            ...payload,
            refreshToken
        }
    }

}