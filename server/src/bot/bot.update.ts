import { Controller } from "@nestjs/common";
import { InjectBot, Start, Update } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";


@Update()
export class BotUpdate
{
    constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

    @Start()
    async start(ctx: Context)
    {
        console.log(await ctx.getChat());
        await ctx.sendMessage('Hi! Press start')
    }
}