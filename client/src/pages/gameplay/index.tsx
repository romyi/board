import { Background, HeroesTab } from "@features/gameplay";
import { Hero } from "@features/gameplay/hero-tab";
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
  const handleDeal = () =>
    sm.emit({
      event: "match.action",
      data: { room_id: room.id, message: "match.launch" },
    });
  return (
    <>
      <Background />
      <HeroesTab />
      <Hero />
      <button onClick={handleStart}>start round</button>
      <button onClick={handleEnd}>finish round</button>
      <button onClick={handleDeal}>deal</button>
    </>
  );
};
