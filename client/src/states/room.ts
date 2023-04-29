import { atom } from "recoil";

export const roomState = atom<{id: string | null, match: string | null, parts: Array<{name: string}>}>({
    key: 'room-state',
    default: {
        id: null,
        match: null,
        parts: []
    }
})