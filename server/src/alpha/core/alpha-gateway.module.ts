import { Module } from '@nestjs/common';
import { AlphaGateway } from './alpha.gateway';
import { AlphaCore } from './alpha-core.module';

@Module({
  imports: [AlphaCore],
  providers: [AlphaGateway],
})
export class AlphaCoreGateway {}
