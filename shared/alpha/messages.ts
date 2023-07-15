// we have hero schema on server
// each hero of it is connected to the game
// with each message from browser we pass hero id
// in constant time find it in hero schema and from there
// can address to the game 

// or we just pass game id from client and in constant time
// address game to perform mechanic from there

// or mix approaches - we have unique user id, so we pass only it
// user id (or nickname) is the same as hero id from schema. in constant
// time we access hero and game as game is referenced in hero.

// also hero has reference to socket id - this is helpful also for debugging
// purposes when all heroes are 'controlled' from the very same socket. 

interface InterchangeCard {
    id: string
    name: string
    group: string
    file: string
}

interface State {
    hero_id: string
    game_id: string
    mode: string
    tier: number
    power: number
    cards: {
        public: Array<InterchangeCard>
        private: Array<InterchangeCard>
    },
    board: {
        loots: number,
        doors: number,
        stash: number
    },
    opponents: 
        Record<string, {
        public: Array<InterchangeCard>, 
        private: number, 
        tier: number, 
        power: number}>
}

// common server-wide in-memory schema
type HeroSchema = Map<string, {match_id: string, socket_id: string}>

// per-match in-memory schema
type CardSchema = Map<string, {name: string, owner: string, deck: string}>
// or owner-proiritiezed map
type OwnerFirstCardSchema = Map<string, {name: string, card_id: string, group: string}>
// map key = hero_id if card is owned by a hero or game_id if it isn't but yet in game (common decks)

interface InterchangeClientMessage {
    hero: string
    match: string
    mechanic: string // or better say - message type
    payload: string // card_id or another hero id or just string with messsage
}