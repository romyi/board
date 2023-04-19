import { useCallback } from "react";
import useSocketManager from "@hooks/useSocketManager";
import { LOBBYING } from "@shared/messages";

export const useInvite = () => {
  const { sm } = useSocketManager();
  const invite = useCallback((user_id: string) => {
    console.log("fire");
    sm.emit({
      event: LOBBYING.init_invitation,
      data: user_id,
    });
  }, []);
  return { invite };
};
