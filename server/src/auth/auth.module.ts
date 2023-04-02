import { PrismaModule } from '@app/prisma/prisma.module';
import { UserModule } from '@app/user/user.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CodeService } from './codes/code.service';
import { CustomStrategy } from './strategies/custom.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [PrismaModule, UserModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1000s' }
  })],
  providers: [AuthService, CodeService, CustomStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, CodeService]
})
export class AuthModule {}
