import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { PrismaModule } from '@app/prisma/prisma.module';
import { RoomService_2 } from './room.service_2';

@Module({
    imports: [PrismaModule],
    controllers: [RoomController],
    providers: [RoomService_2],
    exports: [RoomService_2]
})
export class RoomModule {}
