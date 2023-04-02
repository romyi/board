import { PrismaService } from '@app/prisma/prisma.service';
import { UserService } from '@app/user/user.service';
import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common';
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
}
