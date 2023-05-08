import { atom } from "recoil";

export const heroState = atom<{hero: {hand: any} | null}>({
    key: 'hero-state',
    default: {
        hero: null
    }
})