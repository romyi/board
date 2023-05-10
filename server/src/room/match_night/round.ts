import { MatchMechanics } from "@shared/index";
import { Deck } from "./cards";
import { Hero } from "./hero";
import { Match } from "./match";
import { Skirmish } from "./skirmish";

export class Round
{
    cards_in_action: Deck
    protagonist: Hero
    skirmish: Skirmish | null
    protected _voices_to_start: number
    constructor(protected heroes: Match['heroes'], protected turner: Match['turner'], protected inform: Match['informer']){
        console.log('creating round')
        // this.protagoinist = this.match.turner.pass_turn()
        this._voices_to_start = this.heroes.length
    }
    voice() { 
        this._voices_to_start--;
        console.log('voiced for round, remains: ', this._voices_to_start) 
        if (this._voices_to_start === 0) { 
            this.protagonist = this.turner.pass_turn()
            // this.protagoinist.send(MatchMechanics.PICK_DOOR, {})
            console.log('round starts: ', this)
            this.inform()
            this._voices_to_start = this.heroes.length
        }
    }
}