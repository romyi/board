import { Injectable } from '@nestjs/common';
import { SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { randomInt } from 'crypto';

@Injectable()
export class AuthService {

    constructor(private schedulerRegistry: SchedulerRegistry){}

    public codes: Map<String, String> = new Map();

    async codegen(phone: String): Promise<String>
    {
        const existing = this.codes.get(phone)
        if (existing) {
            return existing;
        } else {
            const code = randomInt(1000000).toString().padStart(6, "0");
            this.codes.set(phone, code);
            const timeout = setTimeout(() => this.stale(phone), 10000)
            this.schedulerRegistry.addTimeout(`stale ${phone}`, timeout)
            return code;
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
}
