import { Background } from "@features/gameplay";
import useSocketManager from "@hooks/useSocketManager";
import { roomState } from "@states/room";
import React from "react";
import { useRecoilValue } from "recoil";

export const Gameplay = () => {
  const room = useRecoilValue(roomState);
  const { sm } = useSocketManager();
  const handleStart = () =>
    sm.emit({
      event: "match.action",
      data: { room_id: room.id, action: "round" },
    });
  const handleEnd = () =>
    sm.emit({
      event: "match.action",
      data: { room_id: room.id, action: "free" },
    });
  return (
    <>
      <Background />
      <button onClick={handleStart}>start round</button>
      <button onClick={handleEnd}>finish round</button>
    </>
  );
};
