import { Controller, Get } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {

    constructor(private readonly roomService: RoomService) {};

    @Get()
    listAll() {
        return JSON.stringify(this.roomService.listRooms().keys().next().value)
    }
}
