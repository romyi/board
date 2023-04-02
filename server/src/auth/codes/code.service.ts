import { Injectable } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { randomUUID } from "crypto";

@Injectable()
export class CodeService
{
    constructor(
        private schedulerRegistry: SchedulerRegistry,
    ){}

    private codes: Map<String, String> = new Map()

    stale(id: String)
    {
        this.codes.delete(id);
        this.schedulerRegistry.deleteTimeout(`stale ${id}`)
    }

    async generate(id: string)
    {
        const existing_code = this.codes.get(id)
        if (!existing_code) {
            const code = randomUUID();
            this.codes.set(id, code);
            const timeout = setTimeout(() => this.stale(id), 15000)
            this.schedulerRegistry.addTimeout(`stale ${id}`, timeout)
            return code;
        }
        return existing_code;
    }

    check(id: string, passed_code: string)
    {
        const temp_code = this.codes.get(id);
        return passed_code === temp_code;
    }
}