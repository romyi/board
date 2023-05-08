import { Deck } from "./cards";
import { Match } from "./match";

export class Hero
{
    hand: Deck
    isOnline: boolean
    constructor(protected match: Match){}
}