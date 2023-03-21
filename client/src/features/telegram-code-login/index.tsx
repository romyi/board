import { telephoneState } from "@states/telephone";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const DisplayCode = () => {
  const [phoneInState] = useRecoilState(telephoneState);
  const { data, refetch } = useQuery({
    retry: false,
    queryKey: ["code"],
    queryFn: () =>
      fetch(
        `http://localhost:3000/api/auth/telegram/code?phone=${phoneInState}`,
        {
          mode: "cors",
        }
      ).then((res) => res.json()),
    enabled: phoneInState !== null,
  });
  if (phoneInState === null) return null;
  return (
    <div className="flex items-center min-h-screen">
      <section className="max-w-[400px] m-auto text-center">
        <h1 className="text-[46px] inline font-medium tracking-[0.2em] font-rubik text-slate-600">
          {data?.code}
        </h1>
        <p>@board_auth_bot</p>
      </section>
    </div>
  );
};
