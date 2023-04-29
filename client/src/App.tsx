import React, { useEffect } from "react";
import { Route, Switch } from "wouter";
import useSocketManager from "./hooks/useSocketManager";
import { Debug, Gameplay, Intro } from "./pages";
import { Fetcher } from "@features/collect-jwt";
import { useRecoilState } from "recoil";
import { roomState } from "@states/room";
import { gameplayState } from "@states/gameplay";

function App() {
  const { sm } = useSocketManager();
  const [room, setroom] = useRecoilState(roomState);
  const [, setgameplay] = useRecoilState(gameplayState);
  useEffect(() => {
    sm.connect();
    sm.onMessage("room.state", (data) => setroom(data));
    sm.onMessage("game state", (data) => setgameplay({ match: data }));
  }, []);
  return (
    <Switch>
      <Route path="/" component={Intro} />
      <Route path="/debug" component={Debug} />
      <Route path="/tg" component={Fetcher} />
      <Route path={`/${room.id}`} component={Gameplay} />
    </Switch>
  );
}

export default App;
