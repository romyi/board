import { Injectable } from '@nestjs/common'
import type { HeroSchema, MatchSchema, OwnerFirstCardSchema } from '@shared/alpha/messages'
import { cardsDescription, deck } from '@shared/alpha/configs';
import { randomUUID } from 'crypto'


@Injectable()
export class CoreService {
    protected heroSchema: HeroSchema = new Map()
    protected matchSchema: MatchSchema = new Map()
    protected cardSchema: OwnerFirstCardSchema = new Map()
    constructor(){}

    init_match(heroes: {name: string}[]) {
        const match_id = randomUUID();
        this.cardSchema.set(match_id, new Map());
        deck.forEach((quantity, name) => {
            for (let i = 0; i < quantity; i ++) {
                const card_id = randomUUID()
                this.cardSchema.get(match_id).set(card_id, {...cardsDescription[name], card_id})
            }
        })
        let for_client_persist = {}
        heroes.map((hero) => {
            const hero_id = randomUUID();
            for_client_persist[hero.name] = hero_id
            this.heroSchema.set(hero_id, {match_id, socket_id: 'socket', tier: 1, power: 1, isInitiator: false})
            this.cardSchema.set(hero_id, new Map())
            return {name: hero.name, id: hero_id}
        })
        return for_client_persist;
    }
}