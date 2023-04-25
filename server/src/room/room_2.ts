import { ExtendedSocket } from '@app/game/game.gateway';
import { Server } from 'socket.io';
import { v4 } from 'uuid';
import { Match } from './match/match';

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
        private clients: Map<string, ExtendedSocket> = new Map(),
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
        this.clients.set(player.decoded.id, player);
        player.join(this.channel);
        this.inform('room.join', { query: "room" })
    }

    kick(player: ExtendedSocket)
    {
        this.clients.delete(player.decoded.id)
        player.leave(this.channel)
        this.inform('room.join', { query: "room" })
    }

    //
    // warning = doesnt work
    //
    list_players()
    {
        console.log(this.clients);
        let players = []
        this.clients.forEach((value, key) => {
            players.push(value.decoded);
        })
        return players;
        // for (let [k, v] of this.clients)
        // {
        //     players.push(v)
        // }
        // console.log('players', players)
        // return players;
    }

    start_match()
    {
        console.log('match is being created')
        this.match = new Match(this.carried_inform(this.server, this.channel), this.list_players())
        this.inform('room.game.start', {})
    }
}