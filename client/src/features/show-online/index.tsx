import { useQuery } from "@tanstack/react-query";
import useSocketManager from "../../hooks/useSocketManager";
import { useEffect } from "react";

export const OnlineList = () => {
  const { sm } = useSocketManager();
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
  console.log(data);
  return (
    <div>
      {data?.map((user: any) => (
        <div key={user.id}>
          <h2>{user.id}</h2>
        </div>
      ))}
    </div>
  );
};
