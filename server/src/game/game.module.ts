import { RoomController } from '@app/room/room.controller';
import { RoomModule } from '@app/room/room.module';
import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { AuthModule } from '@app/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [RoomModule, AuthModule, UserModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '2 days' }
  })],
  providers: [GameGateway],
  controllers: [RoomController]
})
export class GameModule
{
}