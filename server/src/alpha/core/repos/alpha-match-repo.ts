import { Injectable } from '@nestjs/common';
import { Match, MatchSchema } from '@shared/alpha/messages';
import { randomUUID } from 'crypto';

@Injectable()
export class MatchRepository {
  protected matchSchema: MatchSchema = new Map();
  /**
   * create a new match
   * @returns created match's id
   */
  create(): string {
    const match_id = randomUUID();
    this.matchSchema.set(match_id, { heroes: [], scenes: [] });
    return match_id;
  }

  /**
   * @param id wanted match id
   * @returns found match or null
   */
  take_one(id: string): Match | null {
    const match = this.matchSchema.get(id);
    if (match) return match;
    return null;
  }

  erase(id: string): void {
    this.matchSchema.delete(id);
  }
}
