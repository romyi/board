import { Card } from "./card"
import { DoorAlignment, LootAlignment } from "./configs"

export class Deck {
    source: Deck
    name: 'door' | 'loot' | 'stash'
    cards: Array<Card> = []
    pick(quantity: number) {
        if (this.cards.length > quantity) {
            return this.cards.splice(this.cards.length - quantity, quantity)
         } else {
            const new_cards = this.source.cards.filter(sourceCard => sourceCard.type === this.name)
            this.cards.unshift(...new_cards);
            this.source.cards = this.source.cards.filter(sourceCard => sourceCard.type !== this.name)
            this.pick(quantity);
         }
    }
    stash(cards: Array<Card>) {
        this.cards.push(...cards);
    }
    fill(align: DoorAlignment | LootAlignment)
    {
        if (this.name !== 'stash') {
            for (let [alias, meta] of Object.entries(align)) {
                let i = meta.q
                while (i > 0) {
                    this.cards.push(new Card(alias, this.name))
                    i --;
                }
            }
        }
    }
    constructor(name: 'door' | 'loot' | 'stash', source?: Deck)
    {
        this.source = source;
        this.name = name;
    }
}