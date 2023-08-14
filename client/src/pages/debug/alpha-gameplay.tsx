import { useMultitab } from "@features/alpha-store";
import useSocketManager from "@hooks/useSocketManager";
import { events } from "@shared/alpha/payloads";
import { DebugSceneState, DeskSceneState } from "@shared/alpha/configs";
import { alphaState } from "@states/alpha-gameplay";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { DeskScene } from "./desk";

export const AlphaGameplay = () => {
  const { storage: game } = useMultitab<{ id: string }>("match");
  const { sm } = useSocketManager();
  const [state, setstate] = useRecoilState(alphaState);
  const [scenes, setscenes] = useState<DebugSceneState & DeskSceneState>();
  useEffect(() => {
    let params = new URLSearchParams(document.location.search);
    const title = params.get("name");
    if (title) window.document.title = `(testing) ${title}`;
    sm.connect();
    sm.emit({
      event: events["link-to-game"].name,
      data: { hero: params.get("id"), match: game.data?.id },
    });
    sm.onMessage("state", (data) => console.log(data));
    sm.onMessage("hi", (data) => console.log(data));
    sm.onMessage("scenes", (data) => {
      setscenes(data);
    });
  }, []);

  return (
    <div className="relative w-full h-[100dvh] gap-6 flex flex-col justify-center items-center">
      <img
        src="/desk_valley.png"
        className="w-[170px] shadow-xl aspect-square rounded-xl"
      />
      {scenes?.desk && <DeskScene desk={scenes.desk} />}
      <section className="absolute bg-slate-50 shadow-md rounded-xl h-[100px] w-[170px] translate-y-[160px] translate-x-[0px]" />
      <section className="absolute p-4 flex gap-4 flex-wrap rounded-xl h-[170px] w-[200px] translate-y-[0px] translate-x-[-160px]">
        <div className="bg-white rounded-xl shadow-inner h-[50px] w-[50px]" />
        <div className="bg-white rounded-xl shadow-inner h-[50px] w-[50px]" />
        <div className="bg-white rounded-xl shadow-inner h-[50px] w-[50px]" />
      </section>
    </div>
  );
};
