import { atom } from "recoil";

export const telephoneState = atom<String | null>({
    key: 'user-telephone',
    default: null
})