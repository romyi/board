import { AuthService } from "@app/auth/auth.service";
import { UserService } from "@app/user/user.service";
import { Hears, InjectBot, Start, Update } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";
import { Message } from "telegraf/typings/core/types/typegram";

@Update()
export class BotUpdate
{
    constructor(
        @InjectBot() private readonly bot: Telegraf<Context>,
        private authService: AuthService,
        private userService: UserService
    ) {}

    @Start()
    async start(ctx: Context)
    {
        const { id } = await ctx.getChat();
        const user = await this.userService.findUser(id);
        if (user === null) await ctx.reply("Hey! Seems like you first time here. Want to login?");
        else ctx.sendMessage(`hi, ${user.nickname}`);
    }

    @Hears(/\+7[0-9]{10}/)
    async fetchCode(ctx: Context)
    {
        // await this.authService.codes.get()
        const { text: phone } = ctx.message as Message.TextMessage
        if (phone) {
            console.log(phone)
        }
        // await ctx.sendMessage(phone ?? 'none');
    }
}