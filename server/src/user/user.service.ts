import { Prisma } from '.prisma/client';
import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService
{
    constructor(private prisma: PrismaService ) {}

    async findUser(id: number)
    {
        const user = await this.prisma.telegramUser.findFirst({where: {internal_id: id}})
        if (user) return user;
        return null
    }

    async createUser(data: Prisma.TelegramUserCreateNestedOneWithoutUserInput)
    {
        const payload = {
            ...data
        }
        const user = await this.prisma.user.create<Prisma.UserCreateArgs>({ data: {provider: 'tg', telegram: payload} })
        return user;
    }

    async updateUserConnection(connection_id, user_id) {
        const updated = await this.prisma.user.update<Prisma.UserUpdateArgs>({ where: {id: user_id}, data: {connection: connection_id}})
        return updated
    }

    async getOnlineUsers(user_id)
    {
        const data = await this.prisma.user.findMany({where: { connection: { not: null }, id: { not: user_id } }})
        console.log('data', data);
        return data;
    }
}
