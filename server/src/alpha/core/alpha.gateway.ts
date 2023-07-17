import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { events } from '@shared/alpha/payloads';
import { randomUUID } from "crypto";
import { CoreService } from "./alpha-core.service";

@WebSocketGateway()
export class AlphaGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    constructor(
        private core: CoreService,
    ){}
    afterInit() {
        console.log('alpha started')
    }

    async handleConnection() {}

    async handleDisconnect(client: Socket) {
        console.log('client leaves alpha')
        client.disconnect()
    }

    @SubscribeMessage(events["debug.start"].name)
    async onStartDebugGame( client: Socket, message)
    {
        const heroes = this.core.init_match(message);
        client.emit('alpha-debug-heroes', heroes)
    }
}