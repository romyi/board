import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";
import "./index.css";
import { SocketManagerProvider } from "./websocket/SocketManagerProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SocketManagerProvider>
          <App />
        </SocketManagerProvider>
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>
);
