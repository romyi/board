import { AuthService } from "@app/auth/auth.service";
import { UserService } from "@app/user/user.service";
import { Command, Ctx, Hears, InjectBot, Start, Update } from "nestjs-telegraf";
import { Context, Scenes, Telegraf } from "telegraf";
import { Chat, ChatFromGetChat, Message } from "telegraf/typings/core/types/typegram";
import { CustomContext } from "./context";

@Update()
export class BotUpdate
{
    constructor(
        @InjectBot() private readonly bot: Telegraf<CustomContext>,
        private authService: AuthService,
        private userService: UserService
    ) {}

    @Start()
    async start(@Ctx() ctx: CustomContext)
    {
        const { id } = await ctx.getChat();
        const user = await this.userService.findUser(id);
        if (user === null) {
            await ctx.reply("Hey! Seems like you first time here. type /login to enter");
        }
        else ctx.sendMessage(`hi, ${user.nickname}`);
    }

    @Command("login")
    async onLogin(@Ctx() ctx: CustomContext)
    {
        if (ctx.session.login === true) {
            ctx.sendMessage('you already logged in');
            return;
        }
        const chat = await ctx.getChat() as Chat & Chat.UserNameChat;
        await this.userService.createUser({create: {id: chat.id, phone: '', nickname: chat.username}})
        ctx.session.login = true;
    }
}