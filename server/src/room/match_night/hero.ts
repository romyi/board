import { Deck } from "./cards";
import { Match } from "./match";

export class Hero
{
    hand: Deck
    isOnline: boolean
        
        constructor(protected match: Match, readonly user_channel_id: string, public name: string){
        this.hand = new Deck()
        this.isOnline = true
    }
}