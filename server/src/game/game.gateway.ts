import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { SubscribeMessage } from '@nestjs/websockets';
import { RoomService } from "@app/room/room.service";

@WebSocketGateway()
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{

  constructor(
    private roomService: RoomService
  )
  {
  }

  afterInit(server: Server): any
  {
    // Pass server instance to managers
    this.roomService.server = server;
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<void>
  {
    // Call initializers to set up socket
    console.log(`client ${client.id} connected`)
  }

  async handleDisconnect(client: Socket): Promise<void>
  {
    // Handle termination of socket
    this.roomService.terminateSocket(client)
    console.log(`client ${client.id} discconnected`)
  }

  @SubscribeMessage("client.room.list")
  onRoomList()
  {
    const rooms = this.roomService.listRooms()
    return {
      event: 'server.room.list',
      data: {
        message: rooms.keys().next().value
      }
    }
  }

  @SubscribeMessage("client.room.create")
  onRoomCreate(client: Socket)
  {
    const room = this.roomService.startRoom();
    room.addClient(client);

    return {
      event: 'server.game.message',
      data: {
        message: 'room created'
      }
    }
  }

  @SubscribeMessage("client.room.join")
  onRoomJoin(client: Socket, data: string)
  {
    this.roomService.joinRoom(data, client)
  }
}