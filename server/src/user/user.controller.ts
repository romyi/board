import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "@app/auth/guards/jwt.guard";

@Controller('user')
export class UserController
{
    constructor(readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    showStat(@Req() request: Request)
    {
        return request['user'];
    }

    @UseGuards(JwtAuthGuard)
    @Get('online')
    async ShowOnline(@Req() req: Request & {user: any})
    {
        const users = await this.userService.getOnlineUsers(req.user.id);
        return users;
    }
}