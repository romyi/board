import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { SubscribeMessage } from '@nestjs/websockets';
import { RoomService } from "@app/room/room.service";
import { AuthService } from "@app/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "@app/user/user.service";

export interface ExtendedSocket extends Socket {
  decoded: any
}

@WebSocketGateway()
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{

  constructor(
    private roomService: RoomService,
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService
  )
  {
  }

  afterInit(server: Server): any
  {
    // Pass server instance to managers
    this.roomService.server = server;
  }

  async handleConnection(client: ExtendedSocket, ...args: any[]): Promise<void>
  {
    // Call initializers to set up socket
    try {
      const decoded = await this.jwtService.verifyAsync(client.handshake.auth.authorization, { secret: process.env.JWT_SECRET });
      // const decoded = await this.authService.decode(client.handshake.auth.authorization) as {id: number}
    if (decoded) {
      client.decoded = decoded;
      client.join(String(decoded.id))
      const updated = await this.userService.updateUserConnection(String(client.decoded.id), decoded.id);
      if (updated.room) {
        const joined = await this.roomService.joinRoom(updated.room, client)
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
    this.roomService.terminateSocket(client)
    if (client.decoded) {
    const updated = await this.userService.updateUserConnection(null, client.decoded.id);
    }
    client.disconnect();
  }
 
  @SubscribeMessage("client.invite.to.room")
  async onInitInvitation(client: ExtendedSocket, rest)
  { 
      const room = await this.roomService.startRoom(client);
      client.to(rest).emit('invitation', {
      id: client.decoded.id,
      name: client.decoded.name,
      room: room.id
     })
  }

  @SubscribeMessage("confirm.invite")
  async onConfirmInvite(client: ExtendedSocket, room_id: string)
  {
    const joined = await this.roomService.joinRoom(room_id, client);
    if (joined) {
      client.to(room_id).emit('room.joined', `${client.decoded.id} joined`)
    }
    console.log(client.decoded.id);
  }

  @SubscribeMessage("client.room.list")
  onRoomList()
  {
    console.log('list')
    const rooms = this.roomService.listRooms()
    return {
      event: 'server.room.list',
      data: {
        message: rooms.keys().next().value
      }
    }
  }

  @SubscribeMessage("client.room.create")
  async onRoomCreate(client: ExtendedSocket)
  {
    const room = await this.roomService.startRoom(client);
    room.addClient(client);

    return {
      event: 'server.game.message',
      data: {
        message: 'room created',
        id: room.id
      }
    }
  }

  @SubscribeMessage("client.room.join")
  onRoomJoin(client: ExtendedSocket, data: string)
  {
    this.roomService.joinRoom(data, client)
  }
}