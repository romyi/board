import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import blob_animation from "./blob.lottie.json";
import useSocketManager from "@hooks/useSocketManager";
import { useEffect, useState } from "react";

export const UserStats = () => {
  const { sm } = useSocketManager();
  const [state, setState] = useState<null | any>(null);
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
  useEffect(() => {
    sm.onMessage("room.state", (data) => setState(data));
  }, []);
  return (
    <div className="max-w-[300px] flex flex-col justify-center text-center">
      {isLoading && <p>...</p>}
      {data && (
        <>
          {/* <Lottie animationData={blob_animation} loop /> */}
          <h1 className="text-[32px] text-slate-800 font-bold">{data.name}</h1>
        </>
      )}
      {state && (
        <div>
          <h3>{state.id}</h3>
          {state.parts.map((participant: any) => {
            return <div>{participant.name}</div>;
          })}
          <button>leave</button>
        </div>
      )}
    </div>
  );
};
