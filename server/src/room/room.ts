import { ExtendedSocket } from '@app/game/game.gateway';
import { Hero } from '@app/hero/hero';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid'; 

export class Room
{
    // public readonly clients: Map<Socket['id'], Socket> = new Map<Socket['id'], Socket>();
    private heroes: Map<number, any>
    constructor(
        private readonly server: Server,
        public readonly maxHeroes: 4,
        public readonly id: string = v4(),
    ){ this.heroes = new Map() }

    public addClient(client: ExtendedSocket): void
    {
        console.log(client.decoded.id), Boolean(this.heroes.has(client.decoded.id));
        if (Boolean(this.heroes.has(client.decoded.id)) === false && this.heroes.entries.length < this.maxHeroes) {
            client.join(this.id);
            this.heroes.set(client.decoded.id, client.decoded);
            console.log(client.id, 'joined')
        }
    }

    public removeClient(client: Socket): void
    {
        client.leave(this.id)
    }

    public informParticipants<T>(event: "server.info", payload: T): void{
        this.server.to(this.id).emit(event, payload);
    }
}