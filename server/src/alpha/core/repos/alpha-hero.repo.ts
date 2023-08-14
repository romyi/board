import { Injectable } from '@nestjs/common';
import { HeroSchema } from '@shared/alpha/messages';
import { randomUUID } from 'crypto';

Injectable();
export class HeroRepository {
  protected heroSchema: HeroSchema = new Map();
  /**
   * create a new hero in match
   * @param match_id match id to append a hero
   * @returns created hero's id
   */
  create(match_id: string): string {
    const hero_id = randomUUID();
    this.heroSchema.set(hero_id, { match_id, socket_id: 'unknown' });
    return hero_id;
  }

  /**
   * @param id wanted hero id
   * @returns found hero or null
   */
  take_one(id: string): { match_id: string; socket_id: string } | null {
    const hero = this.heroSchema.get(id);
    if (hero) return hero;
    return null;
  }

  erase(id: string): void {
    this.heroSchema.delete(id);
  }
}
