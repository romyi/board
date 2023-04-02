import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { CustomAuthGuard } from './guards/custom.guard';

@Controller('auth')
export class AuthController 
{
    constructor(private authService: AuthService) {}
    
    @UseGuards(CustomAuthGuard)
    @Post('telegram')
    async login(@Req() request: Request)
    {
        return this.authService.login(request.user)
    }
}
