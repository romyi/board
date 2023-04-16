import { PrismaService } from '@app/prisma/prisma.service';
import { UserService } from '@app/user/user.service';
import { JwtService } from '@nestjs/jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CodeService } from './codes/code.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private codeService: CodeService
    ){}

    async login(user)
    {
        const payload = { id: user.internal_id, name: user.nickname }
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async decode(token)
    {
        return this.jwtService.decode(token);
    }

    async fake_login(id)
    {
        const fake_user = await this.userService.findUser(Number(id));
        console.log(fake_user);
        if (fake_user) {
            const payload = { id: fake_user.internal_id, name: fake_user.nickname};
        return {
            access_token: this.jwtService.sign(payload)
        }
        }
    }
}
