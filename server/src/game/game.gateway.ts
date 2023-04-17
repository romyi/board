import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { SubscribeMessage } from '@nestjs/websockets';
import { RoomService } from "@app/room/room.service";
import { AuthService } from "@app/auth/auth.service";
import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export interface ExtendedSocket extends Socket {
  decoded: any
}

@WebSocketGateway()
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{

  constructor(
    private roomService: RoomService,
    private authService: AuthService,
    private jwtService: JwtService
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
      const verified = await this.jwtService.verifyAsync(client.handshake.headers.authorization, { secret: process.env.JWT_SECRET });
      const decoded = await this.authService.decode(client.handshake.headers.authorization)
    if (verified) {
      client.decoded = decoded;
      console.log(`client ${client.id} connected`)
    } else {
      this.handleDisconnect(client);
    }
      
    } catch {
      this.handleDisconnect(client);
    }
  }

  async handleDisconnect(client: Socket): Promise<void>
  {
    // Handle termination of socket
    this.roomService.terminateSocket(client)
    console.log(`client ${client.id} discconnected`)
    client.disconnect();
  }

  @SubscribeMessage("client.room.list")
  onRoomList()
  {
    const rooms = this.roomService.listRooms()
    console.log(rooms)
    return {
      event: 'server.room.list',
      data: {
        message: rooms.keys().next().value
      }
    }
  }

  @SubscribeMessage("client.room.create")
  onRoomCreate(client: ExtendedSocket)
  {
    const room = this.roomService.startRoom();
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
    console.log(client.decoded);
    this.roomService.joinRoom(data, client)
  }
}