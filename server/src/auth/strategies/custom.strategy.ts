import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-custom";
import { Request } from "express";
import { CodeService } from "../codes/code.service";
import { UserService } from "@app/user/user.service";

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy)
{
    constructor(
        private codeService: CodeService,
        private userService: UserService
    )
    {
        super()
    }

    async validate(req: Request)
    {
        const temp_code = req.query.sec;
        const user_id = req.query.id;
        if (typeof temp_code === 'string' && typeof user_id === 'string') {
            const check: boolean = this.codeService.check(user_id, temp_code);
            if (check) {
                const user = await this.userService.findUser(Number(user_id));
                return user;
            }
            throw new UnauthorizedException()

        }
        throw new BadRequestException()
    }
}