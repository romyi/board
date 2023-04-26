import { ExtendedSocket } from '@app/game/game.gateway';
import { Server } from 'socket.io';
import { v4 } from 'uuid';
import { Match } from './match/match';

interface PlayingSocket extends ExtendedSocket {
    status: 'idle' | 'ready' | 'playing'
} 

export class Room
{
    public name: string
    protected readonly channel: string
    public match: Match
    server: Server
    constructor(
        initiator: ExtendedSocket,
        server: Server,
        public readonly id: string = v4(),
        private clients: Map<string, PlayingSocket> = new Map(),
    ) {
        this.server = server
        this.name = id;
        this.channel = id;
        this.append(initiator);
    }

    inform(message: string, data: any ) { this.server.to(this.channel).emit(message, data) }
    carried_inform(server: Server, channel: string){return function(message: string, data: any) {server.to(channel).emit(message, data)}}

    append(player: ExtendedSocket)
    {
        player['status'] = 'idle'
        this.clients.set(player.decoded.id, player as unknown as PlayingSocket);
        player.join(this.channel);
        // this.inform('room.join', { query: "room" })
        console.log(player.decoded.id, ' joins room ', this.id);
        console.log(this.clients.size)
    }

    kick(player: ExtendedSocket)
    {
        this.clients.delete(player.decoded.id)
        player.leave(this.channel)
        console.log(player.decoded.id, ' leaves room ', this.id);
    }

    list_players()
    {
        let players = []
        this.clients.forEach((value) => {
            players.push({...value.decoded, status: value.status});
        })
        return players;
    }

    start_match()
    {
        this.match = new Match(this.carried_inform(this.server, this.channel), this.list_players())
        this.inform('room.game.start', {})
    }
}