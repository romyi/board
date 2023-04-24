import { BadRequestException, Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { RoomService_2 } from './room.service_2';

@Controller('room')
export class RoomController {

    constructor( private roomService: RoomService_2 ) {};

    @Get()
    async room(@Req() req: Request)
    {
        const { id } = req.query
        if (id) {
            const room = this.roomService.find(String(id))
            if (room) return room;
            return 'no room with id'
        } else {
            throw new BadRequestException()
        }
    }
}
