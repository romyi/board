import { useRecoilValue } from "recoil";
import useSocketManager from "../../hooks/useSocketManager";
import { roomState } from "@states/room";
import { gameplayState } from "@states/gameplay";

export const Meta = () => {
  const { socket } = useSocketManager();
  const room = useRecoilValue(roomState);
  const gameplay = useRecoilValue(gameplayState);
  console.log(gameplay);
  return (
    <div className="absolute bottom-1 flex gap-12">
      <p className="block">{socket.connected ? "online" : ""}</p>
      <p className="block">{room?.id ?? ""}</p>
      {/* {gameplay.match !== null && (
        <p className="block">{gameplay.match?.epoch as string}</p>
      )} */}
    </div>
  );
};
