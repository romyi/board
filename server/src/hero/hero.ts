import { Socket } from 'socket.io';
import { v4 } from 'uuid';

export class Hero
{
    public readonly id: string = v4();
    private _client: Socket = null;
    set client(socket: Socket)
    {
        this._client = socket
    }
    get client()
    {
        return this._client
    }
}