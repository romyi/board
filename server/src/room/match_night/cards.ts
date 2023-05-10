import { randomUUID } from "crypto"
import { Match } from "./match"
import { Hero } from "./hero"
import { start_skirmish } from "@app/game/mechanics"

export class Card
{
    id: string
    constructor(
        public title: string,
        public type: 'door' | 'loot'
    )
    {
        this.id = randomUUID()
    }
    activate(match: Match) {}
}

export class MobCard extends Card {
    constructor(public title: string, public rank: number){ super(title, 'door') }
    activate(match: Match): void { start_skirmish(match)(this) }
}

export class Deck
{
    public cards: Card[] = []
    source: Deck
    constructor(){}
    
    shift(desired_count: number) {
        if (this.cards.length >= desired_count) {
            const given_cards = this.cards.splice(this.cards.length - desired_count, desired_count);
            return given_cards
        }
    }
    stack(stacked: Card[]) {
        this.cards.push(...stacked);
    }
    /**
     * Return specific card from deck
     * @param played_card Card to be exposed from a deck
     */
    specific(played_card: Card) {
        const i = this.cards.findIndex(card => card.id === played_card.id);
        return this.cards.splice(i, 1)
    }
}

export class Cards
{
    effects = {
        take(hero: Hero) {
            this.invoke()
        }
    }
    lootcards: Deck
    doorcards: Deck
    stashcards: Deck
    constructor(protected invoke: Match['invoke_mechanic']){
        this.doorcards = new Deck();
        this.lootcards = new Deck();
        this.stashcards = new Deck();
        this.doorcards.source = this.stashcards
        this.lootcards.source = this.stashcards
        this.doorcards.cards = [new Card('door one', 'door'), new Card('cool door', 'door'), new MobCard('humble guy', 2), new Card('dangerous door', 'door'), new Card('nice door', 'door')]
        this.lootcards.cards = [new Card('takai loot', 'loot'), new Card('golden loot', 'loot'), new Card('loot third', 'loot'), new Card('desirable loot', 'loot'), new Card('refined loot', 'loot')]
    }
}