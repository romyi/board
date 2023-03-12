import { useContext } from "react";
import { useRecoilValue } from "recoil";
import { SocketManagerContext } from "../websocket/SocketManagerProvider";
import socketState from "../websocket/SocketState";

export default function useSocketManager() {
    const sm = useContext(SocketManagerContext);
    const socket = useRecoilValue(socketState);

    return {sm, socket}
}