import { Background, HeroesTab, Hero, Decks } from "@features/gameplay";
import useSocketManager from "@hooks/useSocketManager";
import { MatchMessages } from "@shared/index";
import { gameplayState } from "@states/gameplay";
import { roomState } from "@states/room";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export const Gameplay = () => {
  const room = useRecoilValue(roomState);
  const { sm } = useSocketManager();
  const { match } = useRecoilValue(gameplayState);
  const handleStart = () =>
    sm.emit({
      event: "match.action",
      data: { room_id: room.id, message: MatchMessages.ROUND_START_VOICE },
    });
  const handleEnd = () =>
    sm.emit({
      event: "match.action",
      data: { room_id: room.id, action: "free" },
    });
  const handleDeal = () =>
    sm.emit({
      event: "match.action",
      data: { room_id: room.id, message: MatchMessages.DEAL },
    });
  return (
    <main className="max-w-[800px] m-auto h-screen flex flex-col items-center justify-between">
      <Background />
      <HeroesTab />
      <Decks />
      <Hero />
      <div className="mt-[30px] flex gap-4">
        {!match?.epoch.name && (
          <button onClick={handleStart}>start round</button>
        )}
        <button onClick={handleDeal}>deal</button>
      </div>
    </main>
  );
};
