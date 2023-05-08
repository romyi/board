import { Card } from "./cards";
import { Hero } from "./hero";
import { Match } from "./match";

export class Dealer
{
    constructor(protected match: Match){}

    deal_cards(hero: Hero) {
        console.log('dealing to ', hero.name)
        hero.hand.stack(this.match.cards.doorcards.shift(1));
        hero.hand.stack(this.match.cards.lootcards.shift(1));
    }
    stash_specific(card: Card, hero: Hero) {
        this.match.cards.stashcards.stack(hero.hand.specific(card));
    }
}