import { gameplayState } from "@states/gameplay";
import { useRecoilValue } from "recoil";
import { Variants, motion } from "framer-motion";

const backgroundAnimations: Variants = {
  white: {
    background: "white",
  },
  x: {
    background:
      "radial-gradient(59.41% 51.45% at 50% 50%, #E7FFFE 0%, #F8FFFF 73.89%)",
    transitionDuration: "1s",
  },
  y: {
    background:
      "radial-gradient(59.41% 51.45% at 50% 50%, #FFF3FF 0%, #F8FFFF 73.89%)",
    transitionDuration: "1s",
  },
};

export const Background = () => {
  const gameplay = useRecoilValue(gameplayState);
  return (
    <motion.section
      className="h-screen w-screen absolute -z-10"
      variants={backgroundAnimations}
      initial={"white"}
      animate={gameplay.match?.epoch === "free" ? "x" : "y"}
    />
  );
};
