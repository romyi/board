import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: true,
        secretOrKey: process.env.JWT_SECRET
    })
    }

    async validate(payload: any) {
        return { internal_id: payload.id, nickname: payload.name };
    }
}