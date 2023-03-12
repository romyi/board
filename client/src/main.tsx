import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";
import "./index.css";
import { SocketManagerProvider } from "./websocket/SocketManagerProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <SocketManagerProvider>
        <App />
      </SocketManagerProvider>
    </RecoilRoot>
  </React.StrictMode>
);
