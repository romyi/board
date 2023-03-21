import { DisplayCode, CollectPhoneNumber, AuthList } from "@features/index";
import svg_path from "./card_basic.svg";

export const Intro = () => {
  return (
    <main className="max-w-[1000px] m-auto">
      {/* <CollectPhoneNumber />
      <DisplayCode /> */}
      <AuthList />
    </main>
  );
};
