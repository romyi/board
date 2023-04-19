export enum LOBBYING 
{
    init_room = 'client.room.init',

    init_invitation = 'client.invite.to.room',
    send_invitation = 'server.invite.to.room',
    join_room = 'client.room.join'
}

export enum CONNECTIVITY 
{
    establish = 'client.connection.establish',
    clear = 'client.connection.clear'
}