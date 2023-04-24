enum Door {
    'great azavr',
    'tycoon class',
    'star fighter'
}

enum Loot {
    'ai powered shell',
    'heal potion',
    'level booster'
}

export type DoorAlignment = Record<keyof typeof Door, { rank: number, q: number }>
export type LootAlignment = Record<keyof typeof Loot, { price: number, q: number }>

export const door_deck: DoorAlignment = {
    'great azavr': {
        rank: 2,
        q: 3
    },
    'tycoon class': {
        rank: 3,
        q: 2
    },
    'star fighter': {
        rank: 5,
        q: 1
    },
}

export const loots_deck: LootAlignment = {
    'ai powered shell': {
        price: 500,
        q: 1
    },
    'heal potion': {
        price: 100,
        q: 6
    },
    'level booster': {
        price: 500,
        q: 6
    }
}

export const door_legend: Record<keyof typeof Door, any> = {
    'great azavr': {
        title: 'great azavr',
        rank: 10
    },
    'tycoon class': {
        title: 'tycoon class'
    },
    'star fighter': {
        title: 'star fighter'
    },
}
