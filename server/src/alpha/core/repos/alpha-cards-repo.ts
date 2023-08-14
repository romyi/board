import { Injectable } from '@nestjs/common';
import { cardsDescription, deck } from '@shared/alpha/configs';
import { CardSchema, OwnerFirstCardSchema } from '@shared/alpha/messages';
import { randomUUID } from 'crypto';

Injectable();
export class CardRepository {
  protected cardSchema: OwnerFirstCardSchema = new Map();

  /**
   * links new owner in owner-first card mapping, returns
   * freshly created card schema for them. Owner can be
   * either a hero or a match itself.
   * @param owner_id id key of owner
   * @returns new schema
   */
  link_owner(owner_id: string): CardSchema {
    const schema = new Map();
    this.cardSchema.set(owner_id, schema);
    return schema;
  }
  /**
   * too much coupling with a concrete dealing behavior
   * (for now). needs refactoring in the future
   * @param match_id id key of a match
   */
  deal_decks(match_id: string): void {
    deck.forEach((quantity, name) => {
      for (let i = 0; i < quantity; i++) {
        const card_id = randomUUID();
        this.cardSchema
          .get(match_id)
          .set(card_id, { ...cardsDescription[name], card_id });
      }
    });
  }

  erase(id: string): void {
    this.cardSchema.delete(id);
  }
}
