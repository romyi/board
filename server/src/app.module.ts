import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from '@app/game/game.module';
import { RoomModule } from './room/room.module';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [GameModule, RoomModule, BotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
