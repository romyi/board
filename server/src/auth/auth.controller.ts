import { Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController 
{
    constructor(private authService: AuthService) {}
    
    @Post('telegram')
    async postTel(@Req() request: Request)
    {
        const { phone } = request.query;
        this.authService.codegen(phone as String);
    }

    @Get('telegram/code')
    async getCode(@Req() request: Request)
    {
        const { phone } = request.query;
        const code = this.authService.codeget(phone as String);
        console.log(code)
        if (code !== undefined) return {code: code}
    }
}
