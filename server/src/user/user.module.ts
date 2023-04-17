import { PrismaModule } from '@app/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  imports: [PrismaModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1000s' }
  })],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
