import React, { useEffect } from "react";
import { Route, Switch } from "wouter";
import useSocketManager from "./hooks/useSocketManager";
import { Debug, Gameplay, Intro } from "./pages";
import { Fetcher } from "@features/collect-jwt";
import { useRecoilState } from "recoil";
import { roomState } from "@states/room";
import { gameplayState } from "@states/gameplay";
import { clientState } from "@states/client";

function App() {
  const { sm } = useSocketManager();
  const [room, setroom] = useRecoilState(roomState);
  const [, setgameplay] = useRecoilState(gameplayState);
  const [, setClient] = useRecoilState(clientState);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      sm.connect();
      sm.onMessage("room.state", (data) => setroom(data));
      sm.onMessage("game state", (data) => setgameplay({ match: data }));
      sm.onMessage("client.state", (data) => setClient({ client: data }));
    }
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
