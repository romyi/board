import { useMultitab } from "@features/alpha-store";
import useSocketManager from "@hooks/useSocketManager";
import { alphaState } from "@states/alpha-gameplay";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useLocation, useSearch } from "wouter";

export const AlphaGameplay = () => {
  const { storage } = useMultitab<Record<string, string>>("debug_hero_ids");
  const { sm } = useSocketManager();
  const [state, setstate] = useRecoilState(alphaState);
  useEffect(() => {
    let params = new URLSearchParams(document.location.search);
    const title = params.get("name");
    if (title) window.document.title = `(testing) ${title}`;
    sm.connect();
    sm.emit({
      event: "link",
      data: params.get("id"),
    });
    sm.onMessage("state", (data) => console.log(data));
  }, []);

  return <p>match {state.game_id}</p>;
};
