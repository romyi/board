import { RoomController } from '@app/room/room.controller';
import { RoomModule } from '@app/room/room.module';
import { RoomService } from '@app/room/room.service';
import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { AuthModule } from '@app/auth/auth.module';

@Module({
  imports: [RoomModule, AuthModule],
  providers: [GameGateway],
  controllers: [RoomController]
})
export class GameModule
{
}