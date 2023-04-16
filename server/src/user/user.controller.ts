import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "@app/auth/guards/jwt.guard";

@Controller('room')
export class UserController
{
    constructor(readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    showStat()
    {
        
    }
}