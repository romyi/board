import { gameplayState } from "@states/gameplay";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";

export const Background = () => {
  const gameplay = useRecoilValue(gameplayState);
  console.log(gameplay);
  return (
    <motion.section
      animate={{
        background: gameplay.match?.epoch === "free" ? "#994032" : "white",
      }}
      transition={{ duration: 3 }}
    >
      background
    </motion.section>
  );
};
