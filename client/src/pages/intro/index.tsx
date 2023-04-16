import { AuthList } from "@features/index";
import svg_path from "./card_basic.svg";

export const Intro = () => {
  return (
    <main className="max-w-[1000px] m-auto">
      {sessionStorage.getItem("token") && <h1>Hi</h1>}
      {!Boolean(sessionStorage.getItem("token")) && <AuthList />}
    </main>
  );
};
