import { AuthModule } from '@app/auth/auth.module';
import { UserModule } from '@app/user/user.module';
import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { BotUpdate } from './bot.update';

const sessions = new LocalSession({database: 'tg_session.json'});

@Module({
  imports: [
    TelegrafModule.forRoot({
    middlewares: [sessions.middleware()],
    token: process.env.BOT
    }), 
    AuthModule,
    UserModule
  ],
  providers: [BotUpdate],
  exports: [TelegrafModule]
})
export class BotModule {}