import { Injectable } from "@nestjs/common";
import { Server } from "socket.io";
import { Room } from "./room_2";
import { PrismaService } from "@app/prisma/prisma.service";
import { ExtendedSocket } from "@app/game/game.gateway";

@Injectable()
export class RoomService_2
{
    public server: Server;
    readonly rooms: Map<Room['id'], Room>
    constructor(
        private prisma: PrismaService,
    ) {
        this.rooms = new Map();
    }

    public async create(client: ExtendedSocket)
    {
        const created_room = new Room(client, this.server);
        this.rooms.set(created_room.id, created_room);
        await this.prisma.user.update({ where: {id: client.decoded.id }, data: { room: created_room.id }})
        return created_room;
    }

    public async join(room_id: string, client: ExtendedSocket)
    {
        const wanted_room = this.rooms.get(room_id);
        if (wanted_room) {
            wanted_room.append(client);
            await this.prisma.user.update({ where: {id: client.decoded.id }, data: { room: wanted_room.id }})
            return wanted_room
        } else {
            return null;
        }
    }

    public erase_player(client: ExtendedSocket)
    {
        console.log('erasing')
        this.rooms.forEach((room) => {
            const isEmpty = room.kick(client)
            if (isEmpty) {
                this.rooms.delete(room.id)
            }
        });
    }

    public find(id: string)
    {
        const room = this.rooms.get(id);
        if (room) {
            return room
        } else {
            return undefined;
        }
    }
}