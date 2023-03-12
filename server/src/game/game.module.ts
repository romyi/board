import { RoomController } from '@app/room/room.controller';
import { RoomService } from '@app/room/room.service';
import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';

@Module({
  providers: [
    // Gateways
    GameGateway, RoomService
  ],
  controllers: [RoomController]
})
export class GameModule
{
}