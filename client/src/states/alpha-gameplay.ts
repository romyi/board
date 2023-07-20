import { atom } from "recoil";
import type { InterchangeState } from "@shared/alpha/messages";

export const alphaState = atom<InterchangeState>({
  key: "alpha-state",
  default: {
    hero_id: "",
    game_id: "",
    mode: "",
    tier: 0,
    power: 0,
    cards: {
      public: [],
      private: [],
    },
    board: {
      loots: 0,
      doors: 0,
      stash: 0,
    },
  },
});
