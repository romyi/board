import { MatchMechanics } from "@shared/index";
import { Deck } from "./cards";
import { Hero } from "./hero";
import { Match } from "./match";

export class Round
{
    cards_in_action: Deck
    protagoinist: Hero
    protected _voices_to_start: number
    constructor(protected match: Match){
        console.log('creating round')
        // this.protagoinist = this.match.turner.pass_turn()
        this._voices_to_start = match.heroes.length
    }
    voice() { 
        this._voices_to_start--;
        console.log('voiced for round, remains: ', this._voices_to_start) 
        if (this._voices_to_start === 0) { 
            this.protagoinist = this.match.turner.pass_turn()
            // this.protagoinist.send(MatchMechanics.PICK_DOOR, {})
            this.match.inform()
            this._voices_to_start = this.match.heroes.length
        }
    }
}