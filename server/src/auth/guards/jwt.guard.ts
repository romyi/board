import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor( private jwtService: JwtService ) {}

    private extractToken(req: Request): string | null {
        const [type, token] = req.headers['authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : null
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);
        if (!token) {
            throw new UnauthorizedException()
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET })
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException()
        }
        return true;
    }
}