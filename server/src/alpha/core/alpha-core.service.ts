import { Injectable } from '@nestjs/common';
import { CardRepository, HeroRepository, MatchRepository } from './repos';
import { SceneRepository } from './repos/alpha-scene-repo';

@Injectable()
export class CoreService {
  constructor(
    protected heroes: HeroRepository,
    protected cards: CardRepository,
    protected matches: MatchRepository,
    public scenes: SceneRepository,
  ) {}

  // asap refactor: linking is somewhat happening with s.c. deskscene
  // not core, e.g. desk.appendplayer => then scene mutates its state
  // and players are pinged.
  link(socket_id: string, client_id: string) {
    this.heroes.take_one(client_id).socket_id = socket_id;
  }

  init_match(heroes: { name: string }[]) {
    // ERROR in method! gets correct amount of heroes
    console.log(heroes);
    const match_id = this.matches.create();
    this.cards.link_owner(match_id);
    this.cards.deal_decks(match_id);
    const match = this.matches.take_one(match_id);
    heroes.map((hero) => {
      const hero_id = this.heroes.create(match_id);
      console.log(this.matches.take_one(match_id));
      match.heroes.push({ hero_id, name: hero.name });
      // this.matches.take_one(match_id).heroes.push({ hero_id, name: hero.name });
      this.cards.link_owner(hero_id);
    });
    this.scenes.create(match_id, 'desk');
    // returns wrong
    console.log(this.matches.take_one(match_id).heroes);
    return { heroes: this.matches.take_one(match_id).heroes, match: match_id };
  }

  clear_match_data(match_id: string) {
    this.matches.take_one(match_id).heroes.forEach((hero) => {
      this.heroes.erase(hero.hero_id);
      this.cards.erase(hero.hero_id);
    });
    this.cards.erase(match_id);
    this.scenes.erase(match_id);
    this.matches.erase(match_id);
  }

  _debug_report_schemas() {
    console.log(this.scenes, this.matches, this.cards, this.heroes);
  }
}
