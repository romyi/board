import { AuthList, UserStats } from "@features/index";
import svg_path from "./card_basic.svg";

export const Intro = () => {
  return (
    <main className="max-w-[800px] m-auto h-screen">
      {sessionStorage.getItem("token") && <UserStats />}
      {!Boolean(sessionStorage.getItem("token")) && <AuthList />}
    </main>
  );
};
