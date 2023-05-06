import { SetterOrUpdater } from "recoil";
import { io, Socket } from "socket.io-client";
import { SocketState } from "./SocketState";
import { QueryClient } from "@tanstack/react-query";

type EmitOptions<T> = {
    event: string,
    data?: T
}

export default class SocketManager
{
    public readonly socket: Socket;
    public setSocketState: SetterOrUpdater<SocketState>;
    public queryClient: QueryClient;
    constructor()
    {
        this.socket = io(`http://${import.meta.env.VITE_PRIVATE_IP}:3000`, {
            autoConnect: false,
            auth: {
                "authorization": localStorage.getItem('token') ?? 'not authorized'
            },
            path: '/wsapi',
            withCredentials: true
        })

        this.onConnect()
        this.onDisconnect()

        // this.onMessage("room.join", (payload) => {
        //     const { query } = payload;
        //     this.queryClient.invalidateQueries([query])
        // })
    }

    authorize(token: string)
    {
        this.socket.auth = {'authorization': token};
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
        })
    }

    private onDisconnect(): void
    {
        this.socket.on('disconnect', async (reason: Socket.DisconnectReason) => {

            this.setSocketState((state) => {
                return {...state, connected: false}
            })
        })
    }

    onMessage(type: string, callback: (payload: any) => void): void
    {
        this.socket.on(type, callback)
    }
}