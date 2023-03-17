import React, { useState } from "react";
import { Route, Switch } from "wouter";
import reactLogo from "./assets/react.svg";
import useSocketManager from "./hooks/useSocketManager";
import { Debug, Intro } from "./pages";

function App() {
  return (
    <Switch>
      <Route path="/" component={Intro} />
      <Route path="/debug" component={Debug} />
    </Switch>
  );
}

export default App;
