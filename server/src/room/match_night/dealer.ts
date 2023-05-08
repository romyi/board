import { Hero } from "./hero";
import { Match } from "./match";

export class Dealer
{
    constructor(protected match: Match){}

    deal_cards(hero: Hero) {
        hero.hand.stack(this.match.cards.doorcards.shift(1));
        hero.hand.stack(this.match.cards.lootcards.shift(1));
    }
}