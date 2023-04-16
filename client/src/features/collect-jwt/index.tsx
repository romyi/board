import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useLocation } from "wouter";

export const Fetcher = () => {
  const [_, setLocation] = useLocation();
  useQuery({
    retry: false,
    queryKey: ["jwt"],
    queryFn: () =>
      fetch(
        `http://localhost:3000/api/auth/telegram${window.location.search}`,
        { method: "post", body: null }
      )
        .then((res) => res.json())
        .catch(),
    onSuccess(data) {
      if (Boolean(data.access_token)) {
        sessionStorage.setItem("token", data.access_token);
        setLocation("/");
      }
    },
    enabled: !Boolean(sessionStorage.getItem("token")),
  });
  return (
    <div>
      <p>...</p>
    </div>
  );
};
