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
}
