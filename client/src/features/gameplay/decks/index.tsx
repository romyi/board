import useSocketManager from "@hooks/useSocketManager";
import { MatchMechanics, MatchMessages } from "@shared/index";
import { gameplayState } from "@states/gameplay";
import { heroState } from "@states/hero";
import { roomState } from "@states/room";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";

export const Decks = () => {
  const { match } = useRecoilValue(gameplayState);
  const { hero } = useRecoilValue(heroState);
  const room = useRecoilValue(roomState);
  const { sm } = useSocketManager();
  const isEligibleForDoorDraft = useMemo(
    () => match?.epoch.name === hero?.name,
    [match?.epoch]
  );
  const handleDoorClick = useCallback(() => {
    if (isEligibleForDoorDraft)
      sm.emit({
        event: "match.action",
        data: { room_id: room.id, message: MatchMessages.MECHANIC },
      });
  }, [isEligibleForDoorDraft]);
  return (
    <>
      <div className="mt-auto flex gap-4">
        <div onClick={handleDoorClick} className="bg-red-300">
          {match?.doors}
        </div>
        <div className="bg-cyan-800 text-yellow-50">{match?.loots}</div>
        <div className="bg-slate-600 text-yellow-50">{match?.doors}</div>
      </div>
      {isEligibleForDoorDraft && "pick a card from doors"}
    </>
  );
};
