import { AuthList } from "@features/index";
import svg_path from "./card_basic.svg";

export const Intro = () => {
  return (
    <main className="max-w-[1000px] m-auto">
      {localStorage.getItem("token") && <h1>Hi</h1>}
      {!Boolean(localStorage.getItem("token")) && <AuthList />}
    </main>
  );
};
