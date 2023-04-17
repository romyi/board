import { useQuery } from "@tanstack/react-query";
import React from "react";

export const UserStats = () => {
  const { data, isLoading } = useQuery<any, any, { name: string }, any>({
    retry: false,
    queryKey: ["user"],
    queryFn: async () => {
      return fetch("http://localhost:3000/api/user", {
        headers: { Authorization: `Bearer ${sessionStorage.token}` },
      })
        .then((res) => res.json())
        .catch();
    },
  });
  return (
    <div className="max-w-[300px] m-auto flex flex-col justify-center h-full text-center">
      {isLoading && <p>...</p>}
      {data && (
        <>
          <h1 className="text-[32px] text-slate-800 font-bold">{data.name}</h1>
          <div className="max-w-[300px] p-2 text-left">
            <h2>games</h2>
            <h2>wins</h2>
            <h2>last</h2>
          </div>
        </>
      )}
    </div>
  );
};
