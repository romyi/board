import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "wouter";
import reactLogo from "./assets/react.svg";
import useSocketManager from "./hooks/useSocketManager";
import { Debug, Intro } from "./pages";
import { Fetcher } from "@features/collect-jwt";

function App() {
  const [location, setLocation] = useLocation();
  const { sm } = useSocketManager();
  useEffect(() => {
    sm.connect();
    sm.onMessage("room.state", (data) => {
      console.log(data);
      // if (location !== `/${data.id}`) {
      //   setLocation(`/${data.id}`);
      // }
    });
  }, []);
  return (
    <Switch>
      <Route path="/" component={Intro} />
      <Route path="/debug" component={Debug} />
      <Route path="/tg" component={Fetcher} />
    </Switch>
  );
}

export default App;
