import { ExtendedSocket } from "@app/game/game.gateway"
import { door_deck, loots_deck } from "./configs"
import { Deck } from "./deck"
import { Hero } from "./hero"
import { Turner } from "./turner"
import { randomUUID } from "crypto"
import { Round } from "./round"

function reportMatchState(target: any, propertyName: string, descriptor: PropertyDescriptor)
{
 const matchMethod = descriptor.value;
 descriptor.value = function(...args: any[]) {
    const result = matchMethod.apply(this, args);
    this.inform();
    return result;
 }
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
        this.inform()
    }
    @reportMatchState
    hero_inactive(disconnected_id: string) { this.heroes.find((hero) => hero.user_channel_id === String(disconnected_id)).isOnline = false }

    @reportMatchState
    hero_active(connected_id: string) { this.heroes.find((hero) => hero.user_channel_id === String(connected_id)).isOnline = true }
    
    inform() { 
        this.informer('game state', {
        heroes: this.heroes,
        doors: this.doors.cards.length,
        loots: this.loots.cards.length,
        epoch: this.epoch,
        turn: this.turner
    }) }
    
    @reportMatchState
    start_round() { this.epoch = this.turner.pass() }
    
    @reportMatchState
    start_free_epoch() { this.epoch = 'free' }
}