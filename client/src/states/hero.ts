import { atom } from "recoil";

export const heroState = atom<{hero: {hand: any, name: string} | null}>({
    key: 'hero-state',
    default: {
        hero: null
    }
})