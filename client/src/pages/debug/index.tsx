import React from "react";
import useSocketManager from "../../hooks/useSocketManager";

export const Debug = () => {
  const { sm } = useSocketManager();
  const onConnect = () => {
    sm.connect();
  };
  const onCreate = () => {
    sm.emit({
      event: "client.room.create",
    });
  };
  const onList = () => {
    sm.emit({
      event: "client.room.list",
    });
  };
  return (
    <div className="bg-slate-100 m-auto max-w-[800px] p-4">
      <button onClick={onConnect}>connect</button>
      <button onClick={onCreate}>create</button>
      <button onClick={onList}>list</button>
    </div>
  );
};
