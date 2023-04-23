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
        console.log(this.rooms)
        return this.rooms
    }

    public async startRoom(client: ExtendedSocket): Promise<Room>
    {
        let room = new Room(this.server, 4);
        this.rooms.set(room.id, room);
        await this.prisma.user.update({ where: {id: client.decoded.id }, data: { room: room.id }})
        client.join(room.id)
        return room;
    }

    public async joinRoom(roomId: string, client: ExtendedSocket)
    // {
    //     const requestedRoom = this.rooms.get(this.rooms.entries().next().value[0])
    //     if (requestedRoom) {
    //         // requestedRoom.addClient(client);
    //         console.log(client.decoded.id + ' joined ' + roomId)
    //     } else {
    //         console.log('no room ', roomId)
    //     }
    // }
    {
        console.log(`room id ${roomId} is wanted to join to`)
        const room = this.rooms.get(roomId);
        if (room) {
            console.log(client.decoded.id + ' joined ' + roomId);
            await this.prisma.user.update({ where: {id: client.decoded.id }, data: { room: room.id }})
            client.join(room.id)
            return true;
        } else {
            console.log('no room ', roomId)
            return false;
        }
    }
}
