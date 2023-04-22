import useSocketManager from "@hooks/useSocketManager";
import { useEffect, useState } from "react";

export const Notification = () => {
  const { sm } = useSocketManager();
  const [inform, setinform] = useState<{ id: string; name: string } | null>(
    null
  );
  useEffect(() => {
    sm.onMessage("invitation", (payload) => {
      console.log("invitied");
      console.log(payload);
      setinform(payload);
    });
  }, []);
  if (!inform) return null;
  return (
    <div className="absolute max-w-[300px] m-auto mt-3 bg-blue-100 border-blue-300 border-[0.5px] rounded-md p-3">
      <h2 className="text-blue-500 text-[16px] mb-2">
        You've received an invitation
      </h2>
      <p className="text-blue-500 text-[12px]">
        {inform.name} call to join him in room
      </p>
    </div>
  );
};
