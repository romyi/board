import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotUpdate } from './bot.update';

@Module({
  imports: [TelegrafModule.forRoot({
    token: '6275932609:AAH7ZMiNR0gJBfYEWEwNn1EpCsCJsRY8FqU'
  })],
  providers: [BotUpdate],
  exports: [TelegrafModule]
})
export class BotModule {}