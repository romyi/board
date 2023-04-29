import { atom } from "recoil";

type Gameplay = {
    match: {
        heroes: Array<{name: string, isOnline: boolean, rank: number}>,
        doors: number,
        loots: number,
        epoch: 'free' | unknown,
        turn: unknown
        } | null
}

export const gameplayState = atom<Gameplay>({
    key: 'match-state',
    default: {
        match: null
    }
})