import { ExtendedSocket } from "@app/game/game.gateway";
import { Card, Cards } from "./cards";
import { Dealer } from "./dealer";
import { Hero } from "./hero";
import { Round } from "./round";
import { Turner } from "./turner";
import { BroadcastOperator, Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export class Match
{
    cards: Cards
    dealer: Dealer
    turner: Turner
    round: Round = null
    heroes: Hero[] = []
    emitter: (to: string, event: string, data: unknown) => boolean
    constructor(
        public informer: Function,
        heroes: Array<ExtendedSocket['decoded']>,
        public server: Server
    ){
        this.emitter = (to: string, event: string, data: unknown) => this.server.to(to).emit(event, data);
        heroes.forEach((extended) => {
            const new_hero = new Hero(this.emitter, String(extended.id), extended.name)
            this.server.to(String(extended.id)).emit("hero", new_hero);
            this.heroes.push( new_hero )
            
        });
        this.cards = new Cards(this.invoke_mechanic);
        this.dealer = new Dealer(this.cards);
        this.turner = new Turner(this.heroes);
        this.informer = informer;
        this.round = new Round(this.heroes, this.turner, () => this.informer('game state', this.state));
        this.informer('game state', this.state)
    }

    @reportMatchState
    launch() { 
        this.heroes.forEach((hero) => this.dealer.deal_cards(hero));
        // this.start_new_turn()
    }

    // @reportMatchState
    // start_new_turn() { this.round = new Round(this.heroes, this.turner, this.inform) }

    @reportMatchState
    activate(card: Card, player: Hero) {
        this.cards.effects.take(player)
        this.dealer.stash_specific(card, this.heroes.find((hero) => hero.user_channel_id === player.user_channel_id))
    }

    @reportMatchState
    invoke_mechanic() { console.log('invoked') }

    // trouble: cannot find
    @reportMatchState
    hero_inactive(disconnected_id: string) { this.heroes.find((hero) => hero.user_channel_id === String(disconnected_id)).isOnline = false }

    @reportMatchState
    hero_active(connected_id: string) { this.heroes.find((hero) => hero.user_channel_id === String(connected_id)).isOnline = true }

    get state() {
        return {
            heroes: this.heroes.map((hero) => {
                return {name: hero.name, isOnline: hero.isOnline, hand: hero.hand.cards.length}
            }),
            doors: 1,
            loots: 2,
            epoch: {...this.round?.protagonist, hand: null},
            }
        }
    }

    // inform() {
    //     console.log('start info')
    //     this.informer('game state', {
    //     heroes: this.heroes.map((hero) => {
    //         return {name: hero.name, isOnline: hero.isOnline, hand: hero.hand.cards.length}
    //     }),
    //     doors: 1,
    //     loots: 2,
    //     epoch: {...this.round?.protagoinist, hand: null},
    //     })
    //     this.heroes.forEach((hero) => this.server.to(hero.user_channel_id).emit('hero', hero))
    // }

function reportMatchState(target: any, propertyName: string, descriptor: PropertyDescriptor)
{
 const matchMethod = descriptor.value;
 descriptor.value = function(...args: any[]) {
    const result = matchMethod.apply(this, args);
    this.informer('game state', this.state);
    this.heroes.forEach((hero) => this.server.to(hero.user_channel_id).emit('hero', hero))
    return result;
 }
}