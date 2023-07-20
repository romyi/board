import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { events } from '@shared/alpha/payloads';
import { CoreService } from './alpha-core.service';

@WebSocketGateway()
export class AlphaGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  protected server: Server;
  constructor(private core: CoreService) {}

  async afterInit(server: Server) {
    this.server = server;
  }

  async handleConnection() {
    console.log('client connects');
    console.log((await this.server.fetchSockets()).length);
  }

  async handleDisconnect(client: Socket) {
    console.log('client leaves alpha');
    client.disconnect();
  }

  @SubscribeMessage(events['debug.start'].name)
  async onStartDebugGame(client: Socket, message) {
    const heroes = this.core.init_match(message);
    client.emit('alpha-debug-heroes', heroes);
  }

  @SubscribeMessage('link')
  async onLink(client: Socket, id: string) {
    const state = this.core.link(client.id, id);
    client.emit('state', state);
  }
}
