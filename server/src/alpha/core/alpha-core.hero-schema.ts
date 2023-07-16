import { Injectable } from '@nestjs/common'
import type { HeroSchema, MatchSchema } from '@shared/alpha/messages'


@Injectable()
export class CoreService {
    constructor(
        private heroSchema: HeroSchema,
        private matchSchema: MatchSchema
    ){
        this.heroSchema = new Map()
        this.matchSchema = new Map()
    }
}