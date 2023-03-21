import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from '@app/game/game.module';
import { RoomModule } from './room/room.module';
import { BotModule } from './bot/bot.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './user/user.module';

@Module({
  imports: [GameModule, RoomModule, BotModule, AuthModule, ScheduleModule.forRoot(), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}