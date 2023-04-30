import { Hero } from "./hero"

export class Round {
    context: 'door' | 'skirmish' | 'death' | 'retreatment'
    constructor(public hero: Hero){}
}