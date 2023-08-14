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

// detailed card info is requested via REST endpoint
// GET info?card=name
export interface InterchangeCard {
  id: string;
  name: string;
  group: string;
}

export interface InterchangeState {
  hero_id: string;
  game_id: string;
  scenes: InterchangeScene[];
}

export interface Scene {
  id: string;
  title: string;
  match_id: string;
  state: object;
  cast: (card: {
    name: string;
    group: string;
    sceneMethod?: (d: object) => void;
  }) => void;
}

export type SceneSchema = Map<string, Map<string, Scene>>;

// hero entry lifecycle:
// in moment of time K, q of onlne users = q of heroes
// at least 3 heroes can combine match entry in schema

// common server-wide in-memory schema
// socket_id present only if online
export type HeroSchema = Map<
  string,
  {
    match_id: string;
    socket_id: string;
    tier?: number;
    power?: number;
    isInitiator?: boolean;
  }
>;
export type Match = {
  heroes: Array<{ hero_id: string; name: string }>;
  scenes: InterchangeScene[];
};
// common server-wide in-memory schema
export type MatchSchema = Map<string, Match>;

export interface InterchangeScene {
  id: string;
  name: string;
  actions: Record<string, string[]>;
}

// common server-wide in-memory entry-lifetime-TEMPORARY (~3min) schema
// there is also a server method that can built match schema based on draft participants
// what is to start a match?
// 1) create entry in match schema: link heroids in it.
// 2) create entries in card schema - assign common game cards, assign hero cards.
// what is to end a match? take match id,
// 1) delete from card schema (owner-based) key with match id and also
// 2) address hero-ids from match schema - take each id and delete these owner keys from card schema as well.
// 3) after all - take match_info and move it to database for a record - delete match entry from schema in the end.
type InvitationDrafts = Map<
  string,
  {
    heroes: Array<{ hero_id: string; name: string }>;
    waiting: Array<{ hero_id: string; name: string }>;
  }
>;
interface InterchangeInvitation {
  match_id: string;
}

// per-match in-memory schema
// or owner-proiritiezed map
export type OwnerFirstCardSchema = Map<string, CardSchema>;
export type CardSchema = Map<
  string,
  { name: string; card_id: string; group: string }
>;
// map key = hero_id if card is owned by a hero or game_id if it isn't but yet in game (common decks)

interface InterchangeClientMessage {
  hero: string;
  match: string;
  mechanic: string; // or better say - message type
  payload: string; // card_id or another hero id or just string with messsage
}
