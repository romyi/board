import { useCallback } from "react";
import useSocketManager from "@hooks/useSocketManager";

export const useInvite = () => {
  const { sm } = useSocketManager();
  const invite = useCallback((connection_id: string) => {
    sm.emit({
      event: "client.invite.to.room",
      data: connection_id,
    });
  }, []);
  return { invite };
};
