export enum MatchMessages {
    START = "match.start",
    LAUNCH = "match.launch",
    PLAY = "match.card.play",
    ROUND_START_VOICE = "match.round.start",
    MECHANIC = "match.mechanic"
}

export enum MatchMechanics {
    PICK_DOOR = "allow.door.pick"
}

export namespace Client {
    type Card<T extends 'loot' | 'door'> = {
        id: string,
        title: string,
        type: T
    }
    type LootCard = Card<'loot'> & { price: number }
    type DoorCard = Card<'door'> & { rank: number }
    export type BoardCard = LootCard | DoorCard
}