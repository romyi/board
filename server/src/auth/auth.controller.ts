import { Controller, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController 
{
    constructor(private authService: AuthService) {}
    
    @Get('code')
    async getCode(@Req() request: Request): Promise<String>
    {
        const { phone } = request.query;
        return this.authService.codegen(phone as String);
    }
}
