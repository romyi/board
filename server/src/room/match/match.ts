import { ExtendedSocket } from "@app/game/game.gateway"
import { door_deck, loots_deck } from "./configs"
import { Deck } from "./deck"
import { Hero } from "./hero"
import { Turner } from "./turner"

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
    public players: Array<Hero> = []
    private readonly informer: Function
    public turner: Turner
    constructor(
        informer: Function,
        players: Array<ExtendedSocket['decoded']>
    ){
        players.forEach((extended) => {
            this.players.push( new Hero(extended.name, String(extended.id)) )
        })
        this.informer = informer;
        this.stash = new Deck('stash');
        this.doors = new Deck('door', this.stash)
        this.loots = new Deck('loot', this.stash)
        this.epoch = 'free'
        this.doors.fill(door_deck);
        this.loots.fill(loots_deck);
        this.turner = new Turner(this.players);
        this.inform('game state', {doors: this.doors.cards, loots:this.doors.cards, players: this.players})
        console.log('state', {doors: this.doors.cards, loots:this.loots.cards, players: this.players})
    }
    inform(message: string, data: any) { this.informer(message, data) }
}