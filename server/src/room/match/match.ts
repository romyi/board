import { DoorAlignment, LootAlignment, door_deck, loots_deck } from "./configs"
import { randomUUID } from 'crypto'

class Round {
    leader: string
    index: number
    context: 'door' | 'skirmish' | 'death' | 'retreatment'
}

class Card {
    type: 'door' | 'loot'
    title: string
    constructor(
        title: string,
        type: 'door' | 'loot',
        private readonly id: string = randomUUID()
    ){
        this.title = title
        this.type = type
    }
}

class Player {
    constructor(
        public name: string,
        public rank: number = 1,
        public sid: string,
        public hand: Array<Card> = [],
        public equip: Array<Card> = []
    ){}

    take_cards(deck: Deck, quantity: number) {
        this.hand.unshift(...deck.pick(quantity));
    }
}

class Deck {
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

export class Match
{
    private readonly stash: Deck
    private readonly doors: Deck
    private readonly loots: Deck
    public epoch: Round | 'free' = 'free'
    private readonly informer: Function
    constructor(
        informer: Function,
        public players: Array<Player>
    ){
        this.informer = informer;
        this.stash = new Deck('stash');
        this.doors = new Deck('door', this.stash)
        this.loots = new Deck('loot', this.stash)
        this.epoch = 'free'
        this.doors.fill(door_deck);
        this.loots.fill(loots_deck);
        this.inform('game state', {doors: this.doors.cards, loots:this.doors.cards, players: this.players})
        console.log('state', {doors: this.doors.cards, loots:this.loots.cards, players: this.players})
    }
    inform(message: string, data: any) { this.informer(message, data) }
}