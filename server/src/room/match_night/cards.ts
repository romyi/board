import { randomUUID } from "crypto"
import { Match } from "./match"
import { Hero } from "./hero"

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
        take(match: Match, hero: Hero) {
            match.invoke_mechanic()
        }
    }
    lootcards: Deck
    doorcards: Deck
    stashcards: Deck
    constructor(protected match: Match){
        this.doorcards = new Deck();
        this.lootcards = new Deck();
        this.stashcards = new Deck();
        this.doorcards.source = this.stashcards
        this.lootcards.source = this.stashcards
        this.doorcards.cards = [new Card('door one', 'door'), new Card('cool door', 'door'), new Card('dangerous door', 'door'), new Card('handsome door', 'door'), new Card('nice door', 'door')]
        this.lootcards.cards = [new Card('takai loot', 'loot'), new Card('golden loot', 'loot'), new Card('loot third', 'loot'), new Card('desirable loot', 'loot'), new Card('refined loot', 'loot')]
    }
}