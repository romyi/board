import { useRecoilState } from "recoil";
import useSocketManager from "../../hooks/useSocketManager";
import { useEffect } from "react";

export const RoomCreate = () => {
  const { sm, socket } = useSocketManager();
  useEffect(() => {
    sm.connect();
  }, []);
  return (
    <div className="absolute bottom-0">{socket.connected ? "online" : ""}</div>
  );
};
