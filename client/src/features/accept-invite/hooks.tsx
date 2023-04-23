import useSocketManager from "@hooks/useSocketManager";
import { useCallback } from "react";

export const useConfirm = () => {
  const { sm } = useSocketManager();
  const confirm = useCallback((roomid: string) => {
    sm.emit({ event: "confirm.invite", data: roomid });
  }, []);

  return confirm;
};
