import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Room } from './room';


@Injectable()
export class RoomService {
    public server: Server;
    private rooms: Map<Room['id'], Room> = new Map<Room['id'], Room>()

    public terminateSocket(client: Socket): void
    {
        client.rooms.forEach((id) => this.rooms.get(id)?.removeClient(client));
    }

    public listRooms(): Map<Room['id'], Room> {
        console.log(this.rooms)
        return this.rooms
    }

    public startRoom(): Room
    {
        let room = new Room(this.server, 4);
        this.rooms.set(room.id, room);
        return room;
    }

    public joinRoom(roomId: string, client: Socket): void
    {
        const requestedRoom = this.rooms.get(roomId);
        requestedRoom.addClient(client);
    }
}
