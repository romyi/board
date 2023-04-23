import { useConfirm } from "@features/accept-invite";
import useSocketManager from "@hooks/useSocketManager";
import { useEffect, useState } from "react";

export const Notification: React.FC<{
  actionText?: string;
  action?: (roomid: string) => void;
}> = ({ actionText, action }) => {
  const { sm } = useSocketManager();
  const [inform, setinform] = useState<{
    id: string;
    name: string;
    room: string;
  } | null>(null);
  useEffect(() => {
    sm.onMessage("invitation", (payload) => {
      setinform(payload);
    });
  }, []);
  if (!inform) return null;
  return (
    <div className=" mt-3 bg-blue-100 border-blue-300 border-[0.5px] rounded-md p-3">
      <h2 className="text-blue-500 text-[16px] mb-2">
        You've received an invitation
      </h2>
      <p className="text-blue-500 text-[12px]">
        {inform.name} call to join him in room
      </p>
      {action && actionText && (
        <button onClick={() => action(inform.room)}>{actionText}</button>
      )}
    </div>
  );
};

export const Notifications: React.FC = () => {
  const confirm = useConfirm();
  return (
    <div className="absolute max-w-[300px] m-auto ">
      <Notification actionText="accept" action={(id) => confirm(id)} />
    </div>
  );
};
