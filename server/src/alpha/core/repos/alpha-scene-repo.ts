import { Injectable } from '@nestjs/common';
import { DebugSceneState, DeskSceneState } from '@shared/alpha/configs';
import { InterchangeCard, Scene, SceneSchema } from '@shared/alpha/messages';
import { randomUUID } from 'crypto';

class DebugScene {
  protected constructor(
    public match_id: string,
    public id = randomUUID(),
    public title = 'debug',
  ) {}
  static create(match_id: string) {
    return new DebugScene(match_id);
  }
  state = { debug: { id: this.id, value: 1 } };
  cast(
    deb: Omit<InterchangeCard, 'id'> & { debug?: (d: DebugSceneState) => void },
  ): void {
    deb.debug(this.state);
  }
}

class DeskScene {
  protected constructor(
    public match_id: string,
    public id = randomUUID(),
    public title = 'desk',
  ) {}
  static create(match_id: string) {
    return new DeskScene(match_id);
  }
  state: DeskSceneState = { desk: { deck_cards: 0, timer: 10, id: this.id } };
  cast(
    deskTrait: Omit<InterchangeCard, 'id'> & {
      onDesk?: (ds: DeskSceneState) => void;
    },
  ): void {
    deskTrait.onDesk(this.state);
  }
}

@Injectable()
export class SceneRepository {
  protected sceneSchema: SceneSchema = new Map();
  protected scenes = {
    debug: DebugScene,
    desk: DeskScene,
  };
  /**
   * @param id wanted scene id
   * @returns found scene or null
   */
  take_one(match_id: string, id: string): Scene | null {
    const scene = this.sceneSchema.get(match_id).get(id);
    if (scene) return scene;
    return null;
  }

  create(match_id: string, scene: 'debug' | 'desk') {
    const id = randomUUID();
    const match = this.sceneSchema.get(match_id);
    if (match) {
      this.sceneSchema
        .get(match_id)
        .set(id, this.scenes[scene].create(match_id));
    } else {
      this.sceneSchema.set(
        match_id,
        new Map().set(id, this.scenes[scene].create(match_id)),
      );
    }
  }

  match_scene_report(match_id: string): object {
    let report = {};
    for (const scene of this.sceneSchema.get(match_id).entries()) {
      report = { ...report, ...scene[1].state };
    }
    return report;
  }

  erase(id: string): void {
    this.sceneSchema.delete(id);
  }
}
