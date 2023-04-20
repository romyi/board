import { useQuery } from "@tanstack/react-query";
import useSocketManager from "../../hooks/useSocketManager";
import { useEffect } from "react";
import { InviteButton, useInvite } from "..";

export const OnlineList = () => {
  const { sm } = useSocketManager();
  const { invite } = useInvite();
  const { data, refetch } = useQuery({
    retry: false,
    queryKey: ["online"],
    queryFn: () =>
      fetch(`http://localhost:3000/api/user/online`, {
        body: null,
        headers: { Authorization: `Bearer ${sessionStorage.token}` },
      })
        .then((res) => res.json())
        .catch(),
  });
  useEffect(() => sm.onMessage("connection", () => refetch()), []);
  return (
    <div className="h-[100px] flex flex-wrap flex-col">
      {data?.map((user: any) => (
        <div key={user.id}>
          <div className="flex gap-2">
            <h2>{user.id}</h2>
            <button onClick={() => invite(String(user.connection))}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
};
