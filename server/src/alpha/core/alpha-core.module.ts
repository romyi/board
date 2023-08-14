import { Module } from '@nestjs/common';
import { CoreService } from './alpha-core.service';
import { CardRepository, HeroRepository, MatchRepository } from './repos';
import { SceneRepository } from './repos/alpha-scene-repo';

@Module({
  providers: [
    CoreService,
    CardRepository,
    HeroRepository,
    MatchRepository,
    SceneRepository,
  ],
  exports: [CoreService],
})
export class AlphaCore {}
