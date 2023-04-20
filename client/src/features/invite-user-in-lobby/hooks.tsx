import { useCallback } from "react";
import useSocketManager from "@hooks/useSocketManager";
import { LOBBYING } from "@shared/messages";

export const useInvite = () => {
  const { sm } = useSocketManager();
  const invite = useCallback((connection_id: string) => {
    sm.emit({
      event: LOBBYING.init_invitation,
      data: connection_id,
    });
  }, []);
  return { invite };
};
