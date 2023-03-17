import { RoomController } from '@app/room/room.controller';
import { RoomModule } from '@app/room/room.module';
import { RoomService } from '@app/room/room.service';
import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';

@Module({
  imports: [RoomModule],
  providers: [GameGateway],
  controllers: [RoomController]
})
export class GameModule
{
}