import { ExtendedSocket } from "@app/game/game.gateway"
import { door_deck, loots_deck } from "./configs"
import { Deck } from "./deck"
import { Hero } from "./hero"
import { Turner } from "./turner"
import { randomUUID } from "crypto"

class Round {
    leader: string
    index: number
    context: 'door' | 'skirmish' | 'death' | 'retreatment'
}

export class Match
{
    private readonly stash: Deck
    private readonly doors: Deck
    private readonly loots: Deck
    public epoch: Round | 'free' = 'free'
    public heroes: Array<Hero> = []
    private readonly informer: Function
    public turner: Turner
    readonly id: string
    constructor(
        informer: Function,
        heroes: Array<ExtendedSocket['decoded']>
    ){
        this.id = randomUUID();
        heroes.forEach((extended) => {
            this.heroes.push( new Hero(extended.name, String(extended.id)) )
        })
        this.informer = informer;
        this.stash = new Deck('stash');
        this.doors = new Deck('door', this.stash)
        this.loots = new Deck('loot', this.stash)
        this.epoch = 'free'
        this.doors.fill(door_deck);
        this.loots.fill(loots_deck);
        this.turner = new Turner(this.heroes);
        this.inform('game state', this.state)
    }
    hero_inactive(disconnected_id: string) { this.heroes.find((hero) => hero.user_channel_id === String(disconnected_id)).isOnline = false }
    hero_active(connected_id: string) { this.heroes.find((hero) => hero.user_channel_id === String(connected_id)).isOnline = true }
    inform(message: string, data: any) { this.informer(message, data) }
    get state() {
        return {
            heroes: this.heroes,
            doors: this.doors.cards.length,
            loots: this.loots.cards.length,
            epoch: this.epoch,
            turn: this.turner
        }
    }
}