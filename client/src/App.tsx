import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import useSocketManager from "./hooks/useSocketManager";

function App() {
  const { sm } = useSocketManager();
  const onConnect = () => {
    sm.connect();
  };
  const onDisconnect = () => {
    sm.disconnect();
  };
  const onCreate = () => {
    sm.emit({ event: "client.room.create" });
  };
  const onList = () => {
    sm.emit({ event: "client.room.list" });
  };
  return (
    <div>
      <button onClick={onConnect}>connect</button>
      <button onClick={onDisconnect}>disconnect</button>
      <button onClick={onCreate}>create</button>
      <button onClick={onList}>list</button>
    </div>
  );
}

export default App;
