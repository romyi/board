import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Room } from './room';
import { ExtendedSocket } from '@app/game/game.gateway';
import { PrismaService } from '@app/prisma/prisma.service';


@Injectable()
export class RoomService {
    public server: Server;
    private rooms: Map<Room['id'], Room> = new Map<Room['id'], Room>()

    constructor(private prisma: PrismaService){}

    public terminateSocket(client: Socket): void
    {
        client.rooms.forEach((id) => this.rooms.get(id)?.removeClient(client));
    }

    public listRooms(): Map<Room['id'], Room> {
        return this.rooms
    }

    public async startRoom(client: ExtendedSocket): Promise<Room>
    {
        let room = new Room(this.server, 4);
        this.rooms.set(room.id, room);
        console.log(client.decoded.id);
        await this.prisma.user.update({ where: {id: client.decoded.id }, data: { room: room.id }})
        return room;
    }

    public joinRoom(roomId: string, client: ExtendedSocket): void
    {
        const requestedRoom = this.rooms.get(this.rooms.entries().next().value[0])
        // console.log('requested for join', requestedRoom)
        // console.log(requestedRoom);
        requestedRoom.addClient(client);
    }
}
