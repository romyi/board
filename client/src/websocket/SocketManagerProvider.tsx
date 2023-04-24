import React, { createContext, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import SocketManager from "./SocketManager";
import socketState from "./SocketState";
import { useQueryClient } from "@tanstack/react-query";

const socketManager = new SocketManager();

export const SocketManagerContext = createContext<SocketManager>(socketManager);

export function SocketManagerProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const client = useQueryClient();
  socketManager.setSocketState = useSetRecoilState(socketState);
  socketManager.queryClient = client;
  return (
    <SocketManagerContext.Provider value={socketManager}>
      {children}
    </SocketManagerContext.Provider>
  );
}
