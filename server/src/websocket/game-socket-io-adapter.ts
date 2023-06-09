import { IoAdapter } from "@nestjs/platform-socket.io";
import { ServerOptions, Socket } from 'socket.io';
import { CONNECTION_EVENT } from '@nestjs/websockets/constants';

export class GameIoAdapter extends IoAdapter
{
    private options = {
        cors: {
            origin: ["http://localhost:5173", `http://${process.env.PRIVATE_IP}:5173`],
            credentials: true
        },
        path: '/wsapi',
        serveClient: false,
        maxSocketListeners: 35,
    };

    createIOServer(port: number, options?: ServerOptions): any
    {
        return super.createIOServer(port, {...this.options, ...options});
    }

    public bindClientConnect(server: any, callback: Function)
    {
        server.on(CONNECTION_EVENT, (socket: Socket) => {
            socket.setMaxListeners(this.options.maxSocketListeners);
            callback(socket);
        })
    }
}