import { AuthList, Notification, RoomCreate, UserStats } from "@features/index";
import svg_path from "./card_basic.svg";

export const Intro = () => {
  return (
    <main className="max-w-[800px] m-auto h-screen">
      {sessionStorage.getItem("token") && (
        <>
          <Notification />
          <UserStats />
          <RoomCreate />
        </>
      )}
      {!Boolean(sessionStorage.getItem("token")) && <AuthList />}
    </main>
  );
};
