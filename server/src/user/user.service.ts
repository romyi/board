import { Prisma } from '.prisma/client';
import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService
{
    constructor(private prisma: PrismaService ) {}

    findUser(id: number)
    {
        const user = this.prisma.telegramUser.findFirst({where: {id: id}})
        if (user) return user;
        return null
    }

    async createUser(data: Prisma.TelegramUserCreateNestedOneWithoutUserInput)
    {
        const payload = {
            ...data
        }
        await this.prisma.user.create<Prisma.UserCreateArgs>({ data: {provider: 'tg', telegram: payload} })
    }
}
