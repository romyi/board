import { InterchangeCard, Scene } from "./messages";

export interface DebugSceneState {
  debug: {
    id: string;
    value: number;
  };
}

export interface DeskSceneState {
  desk: {
    id: string;
    deck_cards: number;
    timer: number;
  };
}

export const cardsDescription: Record<
  string,
  Omit<InterchangeCard, "id"> & { debug?: (d: DebugSceneState) => void }
> = {
  class_tycoon: {
    name: "class_tycoon",
    group: "characteristics",
  },
  class_officer: {
    name: "class_officer",
    group: "characteristics",
  },
  red_ribbon_rifle: {
    name: "weapon",
    group: "passive_items",
  },
  piccolo: {
    name: "piccolo",
    group: "hostile",
  },
  dragon_ball: {
    name: "dragon_ball",
    group: "active_items",
  },
};

export const deck = new Map([
  ["dragon_ball", 1],
  ["piccolo", 1],
  ["class_officer", 2],
  ["class_tycoon", 2],
]);
