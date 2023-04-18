import { RoomController } from '@app/room/room.controller';
import { RoomModule } from '@app/room/room.module';
import { RoomService } from '@app/room/room.service';
import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { AuthModule } from '@app/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [RoomModule, AuthModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '2 days' }
  })],
  providers: [GameGateway],
  controllers: [RoomController]
})
export class GameModule
{
}