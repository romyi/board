import { Card } from "./cards";
import { Hero } from "./hero";
import { Match } from "./match";

export class Dealer
{
    constructor(protected cards: Match['cards']){}

    deal_cards(hero: Hero) {
        console.log('dealing to ', hero.name)
        hero.hand.stack(this.cards.doorcards.shift(1));
        hero.hand.stack(this.cards.lootcards.shift(1));
    }
    stash_specific(card: Card, hero: Hero) {
        this.cards.stashcards.stack(hero.hand.specific(card));
    }
}