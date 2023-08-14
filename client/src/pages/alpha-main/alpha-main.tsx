import React from "react";
import { motion } from "framer-motion";

export const Main: React.FC = () => {
  return (
    <main className="relative w-full h-[100dvh] gap-6 flex flex-col justify-center items-center">
      <img
        src="/wallpaper valley.png"
        className="w-[220px] aspect-square rounded-xl"
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-xl">munchkin webgame</h1>
        <p className="text-xs font-thin text-slate-200">1.0 leni celestica</p>
      </div>
      <img
        src="/stpk-ufo.svg"
        className="absolute w-[80px] h-[80px] translate-x-[30px] translate-y-[55px] rotate-[-10deg]"
      />
      <img
        src="/mdvl-shield.svg"
        className="absolute w-[100px] h-[100px] translate-x-[100px] translate-y-[45px] rotate-45"
      />
      <img
        src="/stpk-riffle.svg"
        className="absolute w-[100px] h-[100px] translate-x-[-110px] translate-y-[30px]"
      />
      <motion.img
        transition={{ repeat: Infinity, duration: 12 }}
        animate={{
          translateY: [-130, -190, -130],
        }}
        src="/stpk-baloon.svg"
        className="absolute w-[60px] h-[60px]"
      />
    </main>
  );
};
