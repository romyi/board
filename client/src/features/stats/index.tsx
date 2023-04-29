import { useQuery } from "@tanstack/react-query";
import useSocketManager from "@hooks/useSocketManager";
import { useLocation } from "wouter";
import { useRecoilValue } from "recoil";
import { roomState } from "@states/room";

export const UserStats = () => {
  const { sm } = useSocketManager();
  const room = useRecoilValue(roomState);
  const [, setLocation] = useLocation();
  const { data, isLoading } = useQuery<any, any, { name: string }, any>({
    retry: false,
    queryKey: ["user"],
    queryFn: async () => {
      return fetch("http://localhost:3000/api/user", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
        .then((res) => res.json())
        .catch();
    },
  });
  return (
    <div className="max-w-[300px] flex flex-col justify-center text-center">
      {isLoading && <p>...</p>}
      {data && (
        <h1 className="text-[32px] text-slate-800 font-bold">{data.name}</h1>
      )}
      {room.id !== null && (
        <div>
          <h3>{room.id}</h3>
          {room.parts.map((participant: any) => {
            return <div>{participant.name}</div>;
          })}
          <button
            onClick={() => sm.emit({ event: "room.leave", data: room.id })}
          >
            leave
          </button>
          <button
            onClick={() => sm.emit({ event: "start.match", data: room.id })}
          >
            start
          </button>
          <button onClick={() => setLocation(`/${room.id as string}`)}>
            play
          </button>
        </div>
      )}
    </div>
  );
};
