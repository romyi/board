import { Injectable } from '@nestjs/common';

abstract class Scene {
  abstract title: string;
  abstract run(): Scene | void;
  abstract inform(): object;
}

@Injectable()
export class Scenes {}
