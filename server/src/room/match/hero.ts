import { Card } from "./card";
import { Deck } from "./deck";

export class Hero {
    public rank: number
    public hand: Array<Card>
    public equip: Array<Card>
    public isOnline: boolean
    constructor(
        public name: string,
        readonly user_channel_id: string
    ){
        this.isOnline = true
        this.rank = 1;
        this.hand = [];
        this.equip = [];
    }
    take_cards(deck: Deck, quantity: number) {
        this.hand.unshift(...deck.pick(quantity));
    }
}