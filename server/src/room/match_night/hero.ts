import { BroadcastOperator } from "socket.io";
import { Deck } from "./cards";
import { Match } from "./match";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export class Hero
{
    hand: Deck
    isOnline: boolean
    constructor(public emitter: any, readonly user_channel_id: string, public name: string) {
        this.hand = new Deck()
        this.isOnline = true
        console.log('hero created')
    }
    send(event: string, data: unknown) {
        this.emitter(this.user_channel_id, event, data)
        // this.server.to(this.user_channel_id).emit(event, data) 
    }
}