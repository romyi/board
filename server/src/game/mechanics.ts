import { Card } from "@app/room/match_night/cards";
import { Match } from "@app/room/match_night/match"
import { Skirmish } from "@app/room/match_night/skirmish"

/**
 * new Skirmish in running Round with protagonist
 * @param match game instance
 * @param mob monster to battle 
 */
export const start_skirmish = (match: Match) => (mob: Card) => {
    if (!match.round.skirmish) {
        match.round.skirmish = new Skirmish(mob, match.round.protagonist);
    }
}