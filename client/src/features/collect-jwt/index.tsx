import { useQuery } from "@tanstack/react-query";
import useSocketManager from "../../hooks/useSocketManager";
import React, { useEffect } from "react";
import { useLocation } from "wouter";

export const Fetcher = () => {
  const [_, setLocation] = useLocation();
  const { sm } = useSocketManager();
  useQuery({
    retry: false,
    queryKey: ["jwt"],
    queryFn: () =>
      fetch(
        `http://${import.meta.env.VITE_PRIVATE_IP}:3000/api/auth/telegram${
          window.location.search
        }`,
        { method: "post", body: null }
      )
        .then((res) => res.json())
        .catch(),
    onSuccess(data) {
      if (Boolean(data.access_token)) {
        sm.authorize(data.access_token);
        localStorage.setItem("token", data.access_token);
        setLocation("/");
      }
    },
    enabled: !Boolean(localStorage.getItem("token")),
  });
  return (
    <div>
      <p>...</p>
      <p>{localStorage.getItem("token")}</p>
    </div>
  );
};
