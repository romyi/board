class Round {
    leader: string
    index: number
    context: 'door' | 'skirmish' | 'death' | 'retreatment'
}

class Card {
    title: string
    id: number
    type: 'door' | 'loot'
}

class Deck {
    source: Deck
    name: 'door' | 'loot' | 'stash'
    cards: Array<Card>
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

    constructor(name: 'door' | 'loot' | 'stash', source?: Deck)
    {
        this.source = source;
        this.name = name;
    }
}

class Match
{
    epoch: Round | 'free'
    doors: Deck
    loots: Deck
    stash: Deck
    constructor()
    {
        this.stash = new Deck('stash');
        this.doors = new Deck('door', this.stash);
        this.loots = new Deck('loot', this.stash);
    }
}