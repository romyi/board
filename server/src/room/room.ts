import { Hero } from '@app/hero/hero';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid'; 

export class Room
{
    public readonly heroes: Map<Hero['id'], Hero>;
    // public readonly clients: Map<Socket['id'], Socket> = new Map<Socket['id'], Socket>();

    constructor(
        private readonly server: Server,
        public readonly maxHeroes: 4,
        public readonly id: string = v4()
    ){}

    public addClient(client: Socket): void
    {
        // this.clients.set(client.id, client);
        client.join(this.id);
    }

    public removeClient(client: Socket): void
    {
        client.leave(this.id)
    }

    public informParticipants<T>(event: "server.info", payload: T): void{
        this.server.to(this.id).emit(event, payload);
    }
}