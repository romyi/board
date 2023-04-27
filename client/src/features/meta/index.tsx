import { useRecoilState } from "recoil";
import useSocketManager from "../../hooks/useSocketManager";
import { useEffect, useState } from "react";

export const Meta = () => {
  const { sm, socket } = useSocketManager();
  const [state, setState] = useState<null | { id: string }>(null);
  useEffect(() => {
    sm.onMessage("room.state", (data) => {
      setState(data);
    });
  }, []);
  return (
    <div className="absolute bottom-1 flex gap-12">
      <p className="block">{socket.connected ? "online" : ""}</p>
      <p className="block">{state?.id ?? ""}</p>
    </div>
  );
};
