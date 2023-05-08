import { ExtendedSocket } from "@app/game/game.gateway";
import { Card, Cards } from "./cards";
import { Dealer } from "./dealer";
import { Hero } from "./hero";
import { Round } from "./round";
import { Turner } from "./turner";
import { Server } from "socket.io";

export class Match
{
    cards: Cards
    dealer: Dealer
    turner: Turner
    round: Round = null
    heroes: Hero[] = []
    constructor(
        public informer: Function,
        heroes: Array<ExtendedSocket['decoded']>,
        public server: Server
    ){
        heroes.forEach((extended) => {
            const new_hero = new Hero(extended.name, String(extended.id), extended.name)
            this.server.to(String(extended.id)).emit("hero", new_hero);
            this.heroes.push( new_hero )
            
        });
        this.cards = new Cards(this);
        this.dealer = new Dealer(this);
        this.turner = new Turner(this);
        this.informer = informer;
        this.inform()
    }

    @reportMatchState
    launch() { 
        this.heroes.forEach((hero) => this.dealer.deal_cards(hero));
        console.log('dealing complete')
        this.start_new_turn()
    }

    @reportMatchState
    start_new_turn() { this.round = new Round(this) }

    @reportMatchState
    activate(card: Card, player: Hero) {
        this.cards.effects.take(this, player)
        this.dealer.stash_specific(card, this.heroes.find((hero) => hero.user_channel_id === player.user_channel_id))
    }

    @reportMatchState
    invoke_mechanic() { console.log('invoked') }

    // trouble: cannot find
    @reportMatchState
    hero_inactive(disconnected_id: string) { this.heroes.find((hero) => hero.user_channel_id === String(disconnected_id)).isOnline = false }

    @reportMatchState
    hero_active(connected_id: string) { this.heroes.find((hero) => hero.user_channel_id === String(connected_id)).isOnline = true }

    inform() {
        console.log('start info')
        this.informer('game state', {
        heroes: this.heroes.map((hero) => {
            return {...hero, hand: hero.hand.cards.length}
        }),
        doors: 1,
        loots: 2,
        epoch: this.round?.protagoinist, //!
        // turn: this.turner //!
        })
        this.heroes.forEach((hero) => this.server.to(hero.user_channel_id).emit('hero', hero))
    }
}

function reportMatchState(target: any, propertyName: string, descriptor: PropertyDescriptor)
{
 const matchMethod = descriptor.value;
 descriptor.value = function(...args: any[]) {
    const result = matchMethod.apply(this, args);
    this.inform();
    return result;
 }
}