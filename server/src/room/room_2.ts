import { ExtendedSocket } from '@app/game/game.gateway';
import { Server } from 'socket.io';
import { v4 } from 'uuid';

export class Room
{
    public name: string
    private readonly channel: string
    constructor(
        initiator: ExtendedSocket,
        private readonly server: Server,
        public readonly id: string = v4(),
        private clients: Map<string, ExtendedSocket> = new Map(),
        private game: boolean = false
    ) {
        this.name = id;
        this.channel = id;
        this.append(initiator);
    }

    inform(message: string, data: any) { this.server.to(this.channel).emit(message, data) }

    append(player: ExtendedSocket)
    {
        this.clients.set(player.decoded.id, player);
        player.join(this.channel);
        this.inform('room.join', { player: player.decoded.name })
    }

    kick(player: ExtendedSocket)
    {
        this.clients.delete(player.decoded.id)
        player.leave(this.channel)
    }

    list_players()
    {
        let players = []
        for (let player in this.clients.entries())
        {
            players.push(player[1])
        }
        return players;
    }

    start_match()
    {
        this.game = true
        this.inform('room.game.start', {})
    }
}