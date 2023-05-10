import useSocketManager from "@hooks/useSocketManager";
import { MatchMechanics } from "@shared/index";
import { gameplayState } from "@states/gameplay";
import { heroState } from "@states/hero";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export const Decks = () => {
  const { match } = useRecoilValue(gameplayState);
  const { hero } = useRecoilValue(heroState);
  const { sm } = useSocketManager();
  // useEffect(
  //   () => sm.onMessage(MatchMechanics.PICK_DOOR, () => setText("pick a door")),
  //   []
  // );
  return (
    <>
      <div className="mt-auto flex gap-4">
        <div className="bg-red-300">{match?.doors}</div>
        <div className="bg-cyan-800 text-yellow-50">{match?.loots}</div>
        <div className="bg-slate-600 text-yellow-50">{match?.doors}</div>
      </div>
      {match?.epoch.name === hero?.name && "pick a card from doors"}
    </>
  );
};
