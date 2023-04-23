import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import blob_animation from "./blob.lottie.json";
import { OnlineList } from "@features/show-online";

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
          {/* <Lottie animationData={blob_animation} loop /> */}
          <h1 className="text-[32px] text-slate-800 font-bold">{data.name}</h1>
          <div className="max-w-[300px] p-2 text-left">
            <OnlineList />
          </div>
        </>
      )}
    </div>
  );
};
