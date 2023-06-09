import {
  AuthList,
  Notification,
  Notifications,
  Meta,
  UserStats,
} from "@features/index";
import { OnlineList } from "@features/show-online";

export const Intro = () => {
  return (
    <main className="max-w-[800px] m-auto h-screen flex flex-col items-center justify-center">
      {localStorage.getItem("token") && (
        <>
          <Notifications />
          <UserStats />
          <OnlineList />
          <Meta />
        </>
      )}
      {!Boolean(localStorage.getItem("token")) && <AuthList />}
    </main>
  );
};
