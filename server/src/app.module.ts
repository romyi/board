import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from '@app/game/game.module';
import { RoomModule } from './room/room.module';
import { BotModule } from './bot/bot.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AlphaCoreGateway } from '@app/alpha/core/alpha-gateway.module';

@Module({
  imports: [
    AlphaCoreGateway,
    AuthModule,
    ScheduleModule.forRoot(),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2 days' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
