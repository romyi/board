import { Injectable } from '@nestjs/common';
import type {
  HeroSchema,
  InterchangeState,
  MatchSchema,
  OwnerFirstCardSchema,
} from '@shared/alpha/messages';
import { cardsDescription, deck } from '@shared/alpha/configs';
import { randomUUID } from 'crypto';

@Injectable()
export class CoreService {
  protected heroSchema: HeroSchema = new Map();
  protected matchSchema: MatchSchema = new Map();
  protected cardSchema: OwnerFirstCardSchema = new Map();

  provide_state(client_id: string): InterchangeState {
    const hero = this.heroSchema.get(client_id);
    const match = this.matchSchema.get(hero.match_id);
    return {
      hero_id: client_id,
      game_id: hero.match_id,
      mode: 'mode',
      tier: hero.tier,
      power: hero.power,
      cards: {
        public: [],
        private: [],
      },
      board: {
        loots: 0,
        doors: 0,
        stash: 0,
      },
      opponents: match.heroes.filter(
        (opponent) => opponent.hero_id !== client_id,
      ),
    };
  }

  link(socket_id: string, client_id: string) {
    this.heroSchema.get(client_id).socket_id = socket_id;
    return this.provide_state(client_id);
  }

  init_match(heroes: { name: string }[]) {
    const match_id = randomUUID();
    this.matchSchema.set(match_id, { heroes: [] });
    this.cardSchema.set(match_id, new Map());
    deck.forEach((quantity, name) => {
      for (let i = 0; i < quantity; i++) {
        const card_id = randomUUID();
        this.cardSchema
          .get(match_id)
          .set(card_id, { ...cardsDescription[name], card_id });
      }
    });
    const for_client_persist = {};
    heroes.map((hero) => {
      const hero_id = randomUUID();
      for_client_persist[hero.name] = hero_id;
      this.heroSchema.set(hero_id, {
        match_id,
        socket_id: 'unknown',
        tier: 1,
        power: 1,
        isInitiator: false,
      });
      this.cardSchema.set(hero_id, new Map());
      this.matchSchema.get(match_id).heroes.push({ hero_id, name: hero.name });
      return { name: hero.name, id: hero_id };
    });
    return { heroes: for_client_persist, match: match_id };
  }
}
