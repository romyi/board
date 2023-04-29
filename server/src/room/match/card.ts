import { randomUUID } from "crypto"

export class Card {
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