import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { events } from '@shared/alpha/payloads';
import { randomUUID } from "crypto";
import { CoreService } from "./alpha-core.hero-schema";

@WebSocketGateway()
export class AlphaGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    constructor(
        private core: CoreService,
    ){}
    afterInit() {
        console.log('alpha started')
    }

    async handleConnection(client: Socket) {
        console.log('client connects to alpha')
        client.emit('alpha gateway', 'hello')
    }

    async handleDisconnect(client: Socket) {
        console.log('client leaves alpha')
        client.disconnect()
    }

    @SubscribeMessage(events["debug.start"].name)
    async onStartDebugGame( _ ,message)
    {
        // const matchKey = this.matchSchema.set(randomUUID(), {heroes: message.map((hero) => ({name: hero, id: randomUUID()}))})
        // console.log(matchKey)
    }
}