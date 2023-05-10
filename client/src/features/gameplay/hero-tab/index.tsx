import useSocketManager from "@hooks/useSocketManager";
import { MatchMessages, Client } from "@shared/index";
import { heroState } from "@states/hero";
import { roomState } from "@states/room";
import { useRecoilValue } from "recoil";

export const Hero = () => {
  const { hero } = useRecoilValue(heroState);
  const { id } = useRecoilValue(roomState);
  const { sm } = useSocketManager();
  console.log("hero component redrawn, cards: ", hero?.hand);
  return (
    <div className="flex flex-wrap gap-4 mt-auto">
      {hero?.hand.cards.map((card: Client.BoardCard) => {
        return (
          <div
            className="flex flex-col w-[80px] h-[110px] text-center bg-slate-100 p-4 rounded-sm flex-wrap justify-between"
            onClick={() => {
              sm.emit({
                event: "match.action",
                data: {
                  room_id: id,
                  message: MatchMessages.PLAY,
                  hero: hero,
                  card: card,
                },
              });
            }}
            key={card.id}
          >
            <img src={card.type === "door" ? "/skull.svg" : "/swords.svg"} />
            <p className="text-[12px] break-all">{card.title}</p>
          </div>
        );
      })}
    </div>
  );
};
