import { gameplayState } from "@states/gameplay";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import { clientState } from "@states/client";

export const HeroesTab = () => {
  const { match } = useRecoilValue(gameplayState);
  const { client } = useRecoilValue(clientState);
  return (
    <div className="flex gap-4 p-6 flex-wrap">
      {match?.heroes.map((hero) => {
        return (
          <motion.section
            key={hero.name}
            // animate={
            //   typeof match?.epoch !== "string" &&
            //   match.epoch?.hero?.name === hero.name
            //     ? {
            //         scale: [1, 1.2, 1],
            //         borderRadius: ["0%", "20%", "0%"],
            //         transition: {
            //           duration: 1,
            //           ease: "easeInOut",
            //           repeat: Infinity,
            //           repeatDelay: 0.5,
            //         },
            //       }
            //     : {}
            // }
            className={`rounded-sm relative ${
              client?.name === hero.name ? "bg-slate-50" : "bg-white"
            } shadow-sm grid grid-cols-2 grid-rows-2 min-w-[100px] overflow-clip`}
          >
            {!hero.isOnline && (
              <section className="opacity-10 inline bg-black col-start-1 col-end-3 row-start-1 row-end-3" />
            )}
            <h2 className="col-start-1 inline col-end-3 row-start-1 row-end-2 p-2">
              {hero.name}
            </h2>
            <h3 className="col-start-1 inline col-end-3 row-start-2 row-end-3 p-2">
              {hero.rank}
            </h3>
          </motion.section>
        );
      })}
    </div>
  );
};
