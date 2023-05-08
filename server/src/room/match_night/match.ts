import { Cards } from "./cards";
import { Dealer } from "./dealer";
import { Hero } from "./hero";
import { Round } from "./round";
import { Turner } from "./turner";

export class Match
{
    cards: Cards
    dealer: Dealer
    turner: Turner
    round: Round
    heroes: Hero[]
    constructor(){}

    launch() { this.heroes.forEach((hero) => this.dealer.deal_cards(hero)) }
    start_new_turn() { this.round = new Round(this) }
}