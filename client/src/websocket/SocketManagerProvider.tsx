import React, { createContext } from "react";
import { useSetRecoilState } from "recoil";
import SocketManager from "./SocketManager";
import socketState from "./SocketState";

const socketManager = new SocketManager();

export const SocketManagerContext = createContext<SocketManager>(socketManager);

export function SocketManagerProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  socketManager.setSocketState = useSetRecoilState(socketState);
  return (
    <SocketManagerContext.Provider value={socketManager}>
      {children}
    </SocketManagerContext.Provider>
  );
}
