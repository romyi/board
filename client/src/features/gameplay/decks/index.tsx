import { gameplayState } from "@states/gameplay";
import { useRecoilValue } from "recoil";

export const Decks = () => {
  const { match } = useRecoilValue(gameplayState);
  return (
    <div className="mt-auto flex gap-4">
      <div className="bg-red-300">{match?.doors}</div>
      <div className="bg-cyan-800 text-yellow-50">{match?.loots}</div>
      <div className="bg-slate-600 text-yellow-50">{match?.doors}</div>
    </div>
  );
};
