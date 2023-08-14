export const events = {
  "debug.start": {
    name: "debug.start",
  },
  "link-to-game": {
    name: "link-to-game",
    payload: {
      hero: "hero-id",
      match: "match-id",
    },
  },
  "cast-in-scene": {
    name: "cast",
    payload: {
      match_id: "match-id",
      scene_id: "scene-id",
      casted_id: "casted-id",
      casted_title: "casted-title",
    },
  },
};
