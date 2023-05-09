import useSocketManager from "@hooks/useSocketManager";
import { MatchMechanics } from "@shared/index";
import { gameplayState } from "@states/gameplay";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export const Decks = () => {
  const { match } = useRecoilValue(gameplayState);
  const { sm } = useSocketManager();
  const [text, setText] = useState<string | null>(null);
  useEffect(
    () => sm.onMessage(MatchMechanics.PICK_DOOR, () => setText("pick a door")),
    []
  );
  return (
    <>
      <div className="mt-auto flex gap-4">
        <div onClick={() => (text ? setText(null) : {})} className="bg-red-300">
          {match?.doors}
        </div>
        <div className="bg-cyan-800 text-yellow-50">{match?.loots}</div>
        <div className="bg-slate-600 text-yellow-50">{match?.doors}</div>
      </div>
      {text}
    </>
  );
};
