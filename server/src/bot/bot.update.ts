import { AuthService } from "@app/auth/auth.service";
import { UserService } from "@app/user/user.service";
import { Command, Ctx, Hears, InjectBot, Start, Update } from "nestjs-telegraf";
import { Context, Scenes, Telegraf } from "telegraf";
import { Chat, ChatFromGetChat, Message } from "telegraf/typings/core/types/typegram";
import { CustomContext } from "./context";
import { CodeService } from "@app/auth/codes/code.service";

@Update()
export class BotUpdate
{
    constructor(
        @InjectBot() private readonly bot: Telegraf<CustomContext>,
        private authService: AuthService,
        private userService: UserService,
        private codeService: CodeService,
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
        if (ctx.session.user) {
            ctx.sendMessage('you already logged in');
            const code = await this.codeService.generate(String(ctx.session.user.id));
            ctx.sendMessage(`your temporary link: \nhttp://localhost:5173/tg?sec=${code}&id=${ctx.session.user.id}`);
            return;
        }
        const chat = await ctx.getChat() as Chat & Chat.UserNameChat;
        const user = await this.userService.createUser({create: {id: chat.id, nickname: chat.username}})
        const code = await this.codeService.generate(String(user.id));
        ctx.session.user = {id: user.id};
        ctx.sendMessage(`your temporary link: \nhttp://localhost:5173/tg?sec=${code}&id=${user.id}`);
    }
}