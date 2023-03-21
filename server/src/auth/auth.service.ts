import { PrismaService } from '@app/prisma/prisma.service';
import { UserService } from '@app/user/user.service';
import { Injectable } from '@nestjs/common';
import { SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { randomInt } from 'crypto';

@Injectable()
export class AuthService {

    constructor(
        private schedulerRegistry: SchedulerRegistry,
        private userService: UserService
    ){}

    public codes: Map<String, String> = new Map();

    async codegen(phone: String)
    {
        const existing = this.codes.get(phone)
        if (!existing) {
            const code = randomInt(1000000).toString().padStart(6, "0");
            this.codes.set(phone, code);
            const timeout = setTimeout(() => this.stale(phone), 10000)
            this.schedulerRegistry.addTimeout(`stale ${phone}`, timeout)
        }
    }

    stale(phone: String)
    {
        console.log(this.codes);
        console.log('delete code for ', phone)
        this.codes.delete(phone);
        this.schedulerRegistry.deleteTimeout(`stale ${phone}`)
        console.log(this.schedulerRegistry.getTimeouts());
    }

    codeget(phone: String)
    {
        const code = this.codes.get(phone);
        if (code) return code
    }
}
