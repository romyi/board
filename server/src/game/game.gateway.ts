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
    console.log('connected')
    // Call initializers to set up socket
    try {
      const verified = await this.jwtService.verifyAsync(client.handshake.auth.authorization, { secret: process.env.JWT_SECRET });
      const decoded = await this.authService.decode(client.handshake.auth.authorization) as {id: number}
    if (verified) {
      client.decoded = decoded;
      const updated = await this.userService.updateUserConnection(client.id, decoded.id);
    } else {
      this.handleDisconnect(client);
    }
      
    } catch {
      this.handleDisconnect(client);
    }
  }

  async handleDisconnect(client: ExtendedSocket): Promise<void>
  {
    console.log('disconnect')
    // Handle termination of socket
    this.roomService.terminateSocket(client)
    if (client.decoded) {
    const updated = await this.userService.updateUserConnection(null, client.decoded.id);
    }
    client.disconnect();
  }

  @SubscribeMessage("client.invite.to.room")
  onInitInvitation(client: ExtendedSocket, rest)
  { 
     client.to(rest).emit('invitation', {
      id: client.decoded.id,
      name: client.decoded.name
     })
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