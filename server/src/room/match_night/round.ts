import { Deck } from "./cards";
import { Hero } from "./hero";
import { Match } from "./match";

export class Round
{
    cards_in_action: Deck
    protagoinist: Hero
    constructor(protected match: Match){
        console.log('creating round')
        this.protagoinist = this.match.turner.pass_turn()
    }
}