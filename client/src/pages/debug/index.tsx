import React, { useEffect } from "react";
import useSocketManager from "../../hooks/useSocketManager";

export const Debug = () => {
  const { sm } = useSocketManager();
  useEffect(() => {}, []);
  return <h1>debug room</h1>;
};
