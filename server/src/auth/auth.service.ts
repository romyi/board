import { PrismaService } from '@app/prisma/prisma.service';
import { UserService } from '@app/user/user.service';
import { Injectable } from '@nestjs/common';
import { SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {

    constructor(
        private schedulerRegistry: SchedulerRegistry,
        private userService: UserService
    ){}

    public codes: Map<String, String> = new Map();

    async codegen(id: String)
    {
        const existing = this.codes.get(id)
        if (!existing) {
            const code = randomUUID();
            this.codes.set(id, code);
            const timeout = setTimeout(() => this.stale(id), 10000)
            this.schedulerRegistry.addTimeout(`stale ${id}`, timeout)
            return code;
        } else {
            return existing
        }
    }

    stale(id: String)
    {
        console.log(this.codes);
        console.log('delete code for ', id)
        this.codes.delete(id);
        this.schedulerRegistry.deleteTimeout(`stale ${id}`)
        console.log(this.schedulerRegistry.getTimeouts());
    }
}
