import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { SubscribeMessage } from '@nestjs/websockets';
import { AuthService } from "@app/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "@app/user/user.service";
import { RoomService_2 } from "@app/room/room.service_2";

export interface ExtendedSocket extends Socket {
  decoded: any
}

@WebSocketGateway()
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{

  constructor(
    private roomService: RoomService_2,
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService
  )
  {
  }

  afterInit(server: Server): any
  {
    this.roomService.server = server;
  }

  async handleConnection(client: ExtendedSocket, ...args: any[]): Promise<void>
  {
    console.log('active rooms: ', this.roomService.rooms.size)
    try {
      const decoded = await this.jwtService.verifyAsync(client.handshake.auth.authorization, { secret: process.env.JWT_SECRET });
      if (decoded) {
        client.decoded = decoded;
        client.join(String(decoded.id))
        const updated = await this.userService.updateUserConnection(String(client.decoded.id), decoded.id);
        if (updated.room) {
          const joined = await this.roomService.join(updated.room, client)
          if (joined) {
            const state = {id: joined.id, parts: joined.list_players()}
            client.emit('room.state', state)
          }
          if (!joined) {
            await this.userService.updateUser({ room: null }, decoded.id)
          }
        }
      } else {
        this.handleDisconnect(client);
      }
  } catch {
    this.handleDisconnect(client);
  }
}

  async handleDisconnect(client: ExtendedSocket): Promise<void>
  {
    // Handle termination of socket
    this.roomService.erase_player(client)
    if (client.decoded) {
    const updated = await this.userService.updateUserConnection(null, client.decoded.id);
    }
    client.disconnect();
  }
 
  @SubscribeMessage("client.invite.to.room")
  async onInitInvitation(client: ExtendedSocket, guest: string)
  { 
    let id = null;
    const user = await this.userService.findUser(client.decoded.id);
    if (user.room) {
      const {room: existing_room_id} = user;
      const room_in_service = this.roomService.find(existing_room_id);
      id = room_in_service.id ?? (await this.roomService.create(client)).id
    } else {
      id = (await this.roomService.create(client)).id
    }
    client.to(guest).emit('invitation', {
      id: client.decoded.id,
      name: client.decoded.name,
      room: id
    });
  }

  @SubscribeMessage("confirm.invite")
  async onConfirmInvite(client: ExtendedSocket, room_id: string)
  {
    const joined = await this.roomService.join(room_id, client);
    if (joined) {
      const state = {id: joined.id, parts: joined.list_players()}
      client.in(room_id).emit('room.state', state)
      client.emit('room.state', state)
    }
  }

  @SubscribeMessage("start.match")
  async onStart(client: ExtendedSocket, payload: {room_id: string})
  {
    const room_to_start = this.roomService.find(payload.room_id);
    if (room_to_start) {
      room_to_start.start_match()
    }
  }
}