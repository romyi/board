import useSocketManager from "@hooks/useSocketManager";
import { MatchMessages } from "@shared/index";
import { heroState } from "@states/hero";
import { roomState } from "@states/room";
import { useRecoilValue } from "recoil";

export const Hero = () => {
  const { hero } = useRecoilValue(heroState);
  const { id } = useRecoilValue(roomState);
  const { sm } = useSocketManager();
  console.log(hero?.hand?.cards);
  return hero?.hand.cards.map((card: any) => {
    return (
      <div
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
        {card.title}
      </div>
    );
  });
};
