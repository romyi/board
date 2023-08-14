import {
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { events } from '@shared/alpha/payloads';
import { CoreService } from './alpha-core.service';
import { cardsDescription } from '@shared/alpha/configs';

@WebSocketGateway()
export class AlphaGateway implements OnGatewayInit, OnGatewayDisconnect {
  protected server: Server;
  constructor(protected core: CoreService) {}

  async afterInit(server: Server) {
    this.server = server;
  }

  async handleDisconnect(client: Socket) {
    client.disconnect();
  }

  @SubscribeMessage(events['debug.start'].name)
  async onStartDebugGame(client: Socket, message) {
    const init_debug = this.core.init_match(message);
    client.emit('alpha-debug-heroes', init_debug);
    // this.core._debug_report_schemas();
  }

  @SubscribeMessage('debug.end')
  async onEraseDebugSession(client: Socket, message: string) {
    this.core.clear_match_data(message);
    // this.core._debug_report_schemas();
    client.emit('alpha-debug-clear');
  }

  @SubscribeMessage(events['link-to-game'].name)
  async onLink(
    client: Socket,
    data: (typeof events)['link-to-game']['payload'],
  ) {
    console.log('linking');
    client.join(data.match);
    this.core.link(client.id, data.hero);

    // check channel
    this.server.to(data.match).emit('hi', 'hi');
    this.server
      .to(data.match)
      .emit('scenes', this.core.scenes.match_scene_report(data.match));
  }

  /**
   * after each cast heroes are provided with updated state, hence
   * each scene should implement report() method to address to
   * {
   */
  @SubscribeMessage(events['cast-in-scene'].name)
  async onCast(
    _: Socket,
    message: (typeof events)['cast-in-scene']['payload'],
  ) {
    const scene = this.core.scenes.take_one(message.match_id, message.scene_id);
    scene.cast(cardsDescription[message.casted_title]);
    this.server.to(message.match_id).emit('scenes', scene.state);
  }
}
