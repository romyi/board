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
  const [picked, setPicked] = useState<null | { title: string }>(null);
  const { sm } = useSocketManager();
  const isEligibleForDoorDraft = useMemo(
    () => match?.epoch.name === hero?.name && !Boolean(match?.epoch?.skirmish),
    [match?.epoch]
  );
  useEffect(
    () =>
      sm.onMessage("announce", (payload) => {
        if (payload.message === "door picked") {
          setPicked(payload.data);
          setTimeout(() => setPicked(null), 3000);
        }
      }),
    []
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
      {picked && <p>{`${picked.title} picked`}</p>}
      <div className="mt-auto flex gap-4">
        <div
          onClick={handleDoorClick}
          className="bg-red-300 w-[60px] h-[90px] rounded-sm grid items-center text-center text-red-400"
        >
          <h2 className="text-[24px] font-semibold">{match?.doors}</h2>
        </div>
        <div className="bg-cyan-800 text-[24px] font-semibold rounded-sm  w-[60px] h-[90px] grid items-center text-center text-cyan-700">
          <h2>{match?.loots}</h2>
        </div>
        <div className="bg-slate-600 text-[24px] font-semibold rounded-sm  text-slate-500 w-[60px] h-[90px] grid items-center text-center">
          <h2>{match?.doors}</h2>
        </div>
      </div>
      {isEligibleForDoorDraft && "pick a card from doors"}
    </>
  );
};
