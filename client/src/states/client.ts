import { atom } from "recoil";

export const clientState = atom<{client: {id: number, name: string} | null}>({
    key: 'client-state',
    default: {
        client: null
    }
})