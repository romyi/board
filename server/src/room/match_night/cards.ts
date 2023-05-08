import { randomUUID } from "crypto"
import { Match } from "./match"

class Card
{
    id: string
    constructor(public title: string)
    {
        this.id = randomUUID()
    }
}

export class Deck
{
    public cards: Card[]
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
}

export class Cards
{
    lootcards: Deck
    doorcards: Deck
    stashcards: Deck
    constructor(protected match: Match){
        this.doorcards = new Deck();
        this.lootcards = new Deck();
        this.stashcards = new Deck();
        this.doorcards.source = this.stashcards
        this.lootcards.source = this.stashcards
        this.doorcards.cards = [new Card('door one'), new Card('cool door'), new Card('dangerous door'), new Card('handsome door'), new Card('nice door')]
        this.lootcards.cards = [new Card('takai loot'), new Card('golden loot'), new Card('loot third'), new Card('desirable loot'), new Card('refined loot')]
    }
}