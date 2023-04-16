import React, { useState } from "react";
import { Route, Switch } from "wouter";
import reactLogo from "./assets/react.svg";
import useSocketManager from "./hooks/useSocketManager";
import { Debug, Intro } from "./pages";
import { Fetcher } from "@features/collect-jwt";

function App() {
  return (
    <Switch>
      <Route path="/" component={Intro} />
      <Route path="/debug" component={Debug} />
      <Route path="/tg" component={Fetcher} />
    </Switch>
  );
}

export default App;
