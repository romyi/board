import { SetterOrUpdater } from "recoil";
import { io, Socket } from "socket.io-client";
import { SocketState } from "./SocketState";

type EmitOptions<T> = {
    event: string,
    data?: T
}

export default class SocketManager
{
    public readonly socket: Socket;
    public setSocketState: SetterOrUpdater<SocketState>;

    constructor()
    {
        this.socket = io('http://localhost:3000', {
            autoConnect: false,
            extraHeaders: {
                "authorization": sessionStorage.getItem('token') ?? 'not authorized'
            },
            path: '/wsapi',
            withCredentials: true
        })

        this.onConnect()
        this.onDisconnect()
    }

    emit<T>(options: EmitOptions<T>): this
    {
        this.socket.emit(options.event, options.data)
        return this
    }

    connect(): void
    {
        this.socket.connect()
    }

    disconnect(): void
    {
        this.socket.disconnect()
    }

    private onConnect(): void
    {
        this.socket.on('connect', () => {
            this.setSocketState((state) => {
                return {...state, connected: true}
            })
            // this.emit({event: 'client.room.create'})
        })
    }

    private onDisconnect(): void
    {
        this.socket.on('disconnect', async (reason: Socket.DisconnectReason) => {
            console.log(reason);

            this.setSocketState((state) => {
                return {...state, connected: false}
            })
        })
    }

    onMessage(type: string, callback: () => void): void
    {
        this.socket.on(type, callback)
    }
}